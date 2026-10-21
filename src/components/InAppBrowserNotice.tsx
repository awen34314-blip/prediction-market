'use client'

import { GlobeIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useHasHydrated } from '@/hooks/useHasHydrated'
import { isInAppBrowser } from '@/lib/in-app-browser'
import { detectStandaloneMode } from '@/lib/pwa-install'

interface BrowserNoticeCopy {
  title: string
  description: string
  dismiss: string
}

type BrowserWindow = Window & {
  ethereum?: unknown
  solana?: unknown
  okxwallet?: unknown
  TelegramWebviewProxy?: unknown
  Telegram?: { WebApp?: { initData?: string } }
}

const DISMISSAL_KEY = 'windmarket:in-app-browser-notice:dismissed'

function wasDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISSAL_KEY) === '1'
  } catch {
    // Some embedded browsers disable storage. The reminder must still be usable.
    return false
  }
}

function isEmbeddedBrowser() {
  const browserWindow = window as BrowserWindow

  return isInAppBrowser({
    userAgent: window.navigator.userAgent,
    isStandalone: detectStandaloneMode(),
    hasWalletProvider: Boolean(browserWindow.ethereum || browserWindow.solana || browserWindow.okxwallet),
    hasTelegramBridge: Boolean(browserWindow.TelegramWebviewProxy || browserWindow.Telegram?.WebApp?.initData),
  })
}

export default function InAppBrowserNotice({ copy }: { copy: BrowserNoticeCopy }) {
  const hasHydrated = useHasHydrated()
  const [dismissed, setDismissed] = useState(false)

  if (!hasHydrated || dismissed || wasDismissed() || !isEmbeddedBrowser()) {
    return null
  }

  function handleDismiss() {
    setDismissed(true)
    try {
      window.sessionStorage.setItem(DISMISSAL_KEY, '1')
    } catch {
      // The in-memory state still lets the user dismiss the reminder.
    }
  }

  return (
    <aside className="border-b border-primary/20 bg-primary/5" aria-label={copy.title} data-in-app-browser-notice>
      <div className="container flex items-start gap-3 py-3">
        <GlobeIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">{copy.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="-my-1 -me-2 size-11 shrink-0"
          aria-label={copy.dismiss}
          onClick={handleDismiss}
        >
          <XIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </aside>
  )
}
