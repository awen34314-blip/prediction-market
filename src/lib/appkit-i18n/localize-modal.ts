import type { SupportedLocale } from '@/i18n/locales'

import { translateAppKitText } from './translate'

type Original = { source: string; rendered: string }
const ATTRIBUTES = ['placeholder', 'aria-label', 'title']
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'SVG', 'IFRAME'])

/**
 * AppKit 1.8.23 has no locale API. Localize its rendered, open shadow DOM only.
 * Keep Lit nodes/event handlers intact; never change connector state, input values,
 * wallet addresses, QR payloads or messages sent to a wallet for signing.
 * See README.md for the pinned-SDK compatibility contract.
 */
export function localizeAppKitModal(host: HTMLElement, initialLocale: SupportedLocale) {
  let locale = initialLocale
  let disposed = false
  let queued = false
  const originals = new WeakMap<Node, Map<string, Original>>()
  const observed = new Set<Node>()
  const pendingElements = new WeakSet<Element>()

  function localizeValue(node: Node, key: string, value: string, write: (text: string) => void) {
    let entries = originals.get(node)
    if (!entries) {
      entries = new Map()
      originals.set(node, entries)
    }
    const old = entries.get(key)
    // A Lit update may replace our translation with a new English countdown/error.
    const source = old && old.rendered === value ? old.source : value
    const rendered = translateAppKitText(source, locale)
    entries.set(key, { source, rendered })
    if (rendered !== value) {
      write(rendered)
    }
  }

  function schedule() {
    if (disposed || queued) {
      return
    }
    queued = true
    queueMicrotask(() => {
      queued = false
      if (!disposed) {
        scan()
      }
    })
  }

  const observer = new MutationObserver(schedule)
  function observe(node: Node) {
    if (observed.has(node)) {
      return
    }
    observed.add(node)
    observer.observe(node, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTES,
    })
  }

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      localizeValue(node, 'text', node.nodeValue ?? '', (value) => {
        node.nodeValue = value
      })
      return
    }
    if (node instanceof Element) {
      if (SKIP.has(node.tagName)) {
        return
      }
      // Only native attributes: changing reflected Lit properties causes extra renders.
      if (!node.localName.includes('-')) {
        for (const attribute of ATTRIBUTES) {
          const value = node.getAttribute(attribute)
          if (value !== null) {
            localizeValue(node, attribute, value, (text) => node.setAttribute(attribute, text))
          }
        }
      }
      if (node.shadowRoot) {
        walk(node.shadowRoot)
        observe(node.shadowRoot)
      } else if (/^(w3m|wui)-/.test(node.localName) && !pendingElements.has(node)) {
        // AppKit lazy-loads views. Discover roots after upgrade and Lit's first update,
        // without polling, patching attachShadow, or observing the whole page tree.
        pendingElements.add(node)
        void customElements.whenDefined(node.localName).then(async () => {
          if (disposed) {
            return
          }
          await (node as Element & { updateComplete?: Promise<boolean> }).updateComplete
          if (!disposed && node.isConnected) {
            schedule()
          }
        })
      }
    }
    for (const child of Array.from(node.childNodes)) {
      walk(child)
    }
  }

  function scan() {
    // Disconnect before writes to avoid observing our own translations. Rebuild the
    // observed set so detached views do not accumulate across navigation/reopening.
    observer.disconnect()
    observed.clear()
    host.lang = locale
    host.dir = locale === 'ar' ? 'rtl' : 'ltr'
    walk(host)
    observe(host)
  }

  const originalLang = host.getAttribute('lang')
  const originalDir = host.getAttribute('dir')
  scan()
  return {
    setLocale(next: SupportedLocale) {
      locale = next
      scan()
    },
    dispose() {
      disposed = true
      locale = 'en'
      scan()
      observer.disconnect()
      observed.clear()
      for (const [name, value] of [
        ['lang', originalLang],
        ['dir', originalDir],
      ] as const) {
        if (value === null) {
          host.removeAttribute(name)
        } else {
          host.setAttribute(name, value)
        }
      }
    },
  }
}

/** AppKit inserts a singleton modal directly into document.body, outside React. */
export function watchAppKitLocale(initialLocale: SupportedLocale) {
  let locale = initialLocale
  let active: ReturnType<typeof localizeAppKitModal> | undefined
  let host: HTMLElement | null = null
  function sync() {
    const next = document.body.querySelector<HTMLElement>(':scope > w3m-modal')
    if (next === host) {
      return
    }
    active?.dispose()
    host = next
    active = host ? localizeAppKitModal(host, locale) : undefined
  }
  const observer = new MutationObserver(sync)
  observer.observe(document.body, { childList: true })
  sync()
  return {
    setLocale(next: SupportedLocale) {
      locale = next
      active?.setLocale(next)
    },
    dispose() {
      observer.disconnect()
      active?.dispose()
    },
  }
}
