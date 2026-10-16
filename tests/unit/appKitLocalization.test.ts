import { describe, expect, it } from 'bun:test'

import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { localizeAppKitModal, watchAppKitLocale } from '@/lib/appkit-i18n/localize-modal'
import { appKitMessages, translateAppKitText } from '@/lib/appkit-i18n/translate'

function settle() {
  return new Promise((resolve) => setTimeout(resolve, 15))
}
function fixture() {
  const host = document.createElement('w3m-modal')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'open' })
  const view = document.createElement('w3m-test-view')
  const inner = view.attachShadow({ mode: 'open' })
  root.append(view)
  inner.innerHTML =
    '<h2>Connect Wallet</h2><button>Continue with Google</button><input placeholder="Email" value="owner@example.com"><p>Resend in 30s</p><pre>Sign this message</pre><code>Connect Wallet</code><style>/* Connect Wallet */</style>'
  return { host, root, inner }
}

describe('Reown AppKit locale integration', () => {
  it('has a complete catalog and matching placeholders for every supported site language', () => {
    expect(Object.keys(appKitMessages).sort()).toEqual([...SUPPORTED_LOCALES].sort())
    const keys = Object.keys(appKitMessages.en).sort()
    for (const locale of SUPPORTED_LOCALES) {
      expect(Object.keys(appKitMessages[locale]).sort()).toEqual(keys)
      for (const key of keys) {
        const translated = (appKitMessages[locale] as Record<string, string>)[key]!
        expect(translated.trim().length).toBeGreaterThan(0)
        expect(translated.match(/\{\w+\}/g)?.sort()).toEqual(key.match(/\{\w+\}/g)?.sort())
      }
    }
  })

  it('localizes dynamic SDK messages without changing provider names or countdowns', () => {
    expect(translateAppKitText('Continue with Google', 'zh')).toBe('使用 Google 登录')
    expect(translateAppKitText('Resend in 24s', 'zh')).toBe('24 秒后重新发送')
    expect(translateAppKitText('Switching to Polygon network...', 'zh')).toBe('正在切换至 Polygon 网络…')
    expect(translateAppKitText('  needs to connect to your wallet\n', 'zh')).toBe('  需要连接您的钱包\n')
    for (const value of [
      'MetaMask',
      'WalletConnect',
      'reown',
      'owner@example.com',
      '0x123abc',
      'wc:123',
      'Unexpected provider error 987',
    ]) {
      expect(translateAppKitText(value, 'zh')).toBe(value)
    }
    expect(translateAppKitText('Connect Wallet', 'en')).toBe('Connect Wallet')
  })

  it('switches all twelve locales on an open modal and restores the original English', () => {
    const { host, inner } = fixture()
    const localizer = localizeAppKitModal(host, 'zh')
    for (const locale of SUPPORTED_LOCALES) {
      localizer.setLocale(locale)
      expect(inner.querySelector('h2')?.textContent).toBe(appKitMessages[locale]['Connect Wallet'])
      expect(host.lang).toBe(locale)
      expect(host.dir).toBe(locale === 'ar' ? 'rtl' : 'ltr')
      expect(inner.querySelector('input')?.placeholder).toBe(appKitMessages[locale].Email)
      expect(inner.querySelector('input')?.value).toBe('owner@example.com')
      expect(inner.querySelector('code')?.textContent).toBe('Connect Wallet')
      expect(inner.querySelector('style')?.textContent).toBe('/* Connect Wallet */')
    }
    localizer.dispose()
    expect(inner.querySelector('h2')?.textContent).toBe('Connect Wallet')
    expect(inner.querySelector('input')?.placeholder).toBe('Email')
    expect(host.hasAttribute('lang')).toBe(false)
  })

  it('preserves button nodes and handlers, and handles live countdown/error updates', async () => {
    const { host, inner } = fixture()
    const button = inner.querySelector('button')!
    let clicked = 0
    button.addEventListener('click', () => clicked++)
    const localizer = localizeAppKitModal(host, 'zh')
    button.click()
    expect(clicked).toBe(1)
    expect(inner.querySelector('button')).toBe(button)
    const countdown = inner.querySelector('p')!.firstChild!
    countdown.nodeValue = 'Resend in 29s'
    await settle()
    expect(countdown.nodeValue).toBe('29 秒后重新发送')
    countdown.nodeValue = 'Connection declined'
    await settle()
    expect(countdown.nodeValue).toBe('连接请求被拒绝')
    localizer.setLocale('ja')
    expect(countdown.nodeValue).toBe('接続が拒否されました')
    localizer.dispose()
  })

  it('discovers new nested shadow roots, including a lazily upgraded SDK view', async () => {
    const { host, root } = fixture()
    const localizer = localizeAppKitModal(host, 'zh')
    const view = document.createElement('w3m-locale-lazy-test')
    root.append(view)
    await settle()
    customElements.define(
      'w3m-locale-lazy-test',
      class extends HTMLElement {
        constructor() {
          super()
          this.attachShadow({ mode: 'open' }).innerHTML = '<button>Sign</button><p>Signing...</p>'
        }
      },
    )
    await settle()
    expect(view.shadowRoot?.querySelector('p')?.textContent).toBe('正在签名…')
    const nested = document.createElement('wui-locale-test')
    nested.attachShadow({ mode: 'open' }).innerHTML = '<input placeholder="Search wallet" aria-label="Close">'
    view.shadowRoot!.append(nested)
    await settle()
    expect(nested.shadowRoot?.querySelector('input')?.placeholder).toBe('搜索钱包')
    localizer.dispose()
  })

  it('watches modal creation/replacement only and leaves the site outside it untouched', async () => {
    const outside = document.createElement('p')
    outside.textContent = 'Connect Wallet'
    document.body.append(outside)
    const watcher = watchAppKitLocale('zh')
    const first = fixture()
    await settle()
    expect(first.inner.querySelector('h2')?.textContent).toBe('登录风向市场')
    expect(outside.textContent).toBe('Connect Wallet')
    first.host.remove()
    const second = fixture()
    await settle()
    expect(second.inner.querySelector('h2')?.textContent).toBe('登录风向市场')
    watcher.setLocale('ko')
    expect(second.inner.querySelector('h2')?.textContent).toBe('WindMarket 로그인')
    watcher.dispose()
    second.inner.querySelector('h2')!.textContent = 'Connect Wallet'
    await settle()
    expect(second.inner.querySelector('h2')?.textContent).toBe('Connect Wallet')
  })
})
