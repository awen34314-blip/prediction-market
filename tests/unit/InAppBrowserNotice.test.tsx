import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { renderToString } from 'react-dom/server'

import InAppBrowserNotice from '@/components/InAppBrowserNotice'
import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { isInAppBrowser } from '@/lib/in-app-browser'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

const ANDROID_CHROME =
  'Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'
const ANDROID_WEBVIEW =
  'Mozilla/5.0 (Linux; Android 16; Pixel 9 Build/BP2A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36'
const IOS_WEBVIEW =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
const IOS_SAFARI = `${IOS_WEBVIEW} Version/18.0 Safari/604.1`

describe('in-app browser detection', () => {
  it.each([
    ['WeChat', `${IOS_WEBVIEW} MicroMessenger/8.0.60`],
    ['QQ', `${IOS_WEBVIEW} QQ/9.0.0`],
    ['Facebook', `${IOS_WEBVIEW} [FBAN/FBIOS;FBAV/500.0.0.0;]`],
    ['Instagram', `${IOS_WEBVIEW} Instagram 350.0.0.0`],
    ['LINE', `${IOS_WEBVIEW} Line/15.0.0`],
    ['TikTok', `${IOS_WEBVIEW} BytedanceWebview/d8a21`],
    ['Telegram', `${ANDROID_CHROME} Telegram/11.0`],
    ['Android WebView', ANDROID_WEBVIEW],
  ])('recognizes %s without depending on the Safari token', (_, userAgent) => {
    expect(isInAppBrowser({ userAgent })).toBe(true)
  })

  it.each([
    ['Android Chrome', ANDROID_CHROME],
    ['iPhone Safari', IOS_SAFARI],
    ['iPhone Chrome', `${IOS_WEBVIEW} CriOS/140.0.0.0 Safari/604.1`],
    ['iPhone Firefox', `${IOS_WEBVIEW} FxiOS/140.0 Safari/605.1.15`],
    [
      'desktop Chrome',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36',
    ],
    ['an unidentified iOS browser', IOS_WEBVIEW],
  ])('does not warn in %s', (_, userAgent) => {
    expect(isInAppBrowser({ userAgent })).toBe(false)
  })

  it.each([
    'MetaMaskMobile/7.0',
    'TrustWallet/11.0',
    'CoinbaseWallet/29.0',
    'OKApp/6.0',
    'TokenPocket/2.0',
    'Phantom/25.0',
  ])('exempts a %s wallet browser even with an Android WebView marker', (wallet) => {
    expect(isInAppBrowser({ userAgent: `${ANDROID_WEBVIEW} ${wallet}` })).toBe(false)
  })

  it('exempts injected wallets and installed PWAs', () => {
    expect(isInAppBrowser({ userAgent: ANDROID_WEBVIEW, hasWalletProvider: true })).toBe(false)
    expect(isInAppBrowser({ userAgent: ANDROID_WEBVIEW, isStandalone: true })).toBe(false)
  })

  it('recognizes a Telegram bridge even without an app-specific user agent', () => {
    expect(isInAppBrowser({ userAgent: IOS_WEBVIEW, hasTelegramBridge: true })).toBe(true)
  })
})

describe('InAppBrowserNotice', () => {
  const copy = getWindMarketCopy('zh-hant').inAppBrowserNotice
  let restoreProperties: Array<() => void> = []

  function override(target: object, key: string, descriptor: PropertyDescriptor) {
    const original = Object.getOwnPropertyDescriptor(target, key)
    restoreProperties.push(() => {
      if (original) {
        Object.defineProperty(target, key, original)
      } else {
        Reflect.deleteProperty(target, key)
      }
    })
    Object.defineProperty(target, key, { configurable: true, ...descriptor })
  }

  beforeEach(() => {
    window.sessionStorage.clear()
    override(window.navigator, 'userAgent', { value: ANDROID_WEBVIEW })
  })

  afterEach(() => {
    for (const restore of restoreProperties.toReversed()) {
      restore()
    }
    restoreProperties = []
    window.sessionStorage.clear()
  })

  it('shows a dismissible reminder with no navigation links or modal', () => {
    const originalUrl = window.location.href
    render(<InAppBrowserNotice copy={copy} />)

    expect(screen.getByRole('complementary', { name: copy.title })).toBeInTheDocument()
    expect(screen.getByText(copy.description)).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(window.location.href).toBe(originalUrl)
  })

  it('keeps the reminder dismissed when the page remounts in the same session', () => {
    const firstPage = render(<InAppBrowserNotice copy={copy} />)
    fireEvent.click(screen.getByRole('button', { name: copy.dismiss }))
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    firstPage.unmount()

    render(<InAppBrowserNotice copy={copy} />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('can still be displayed and dismissed if session storage is blocked', () => {
    override(window, 'sessionStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError')
      },
    })
    render(<InAppBrowserNotice copy={copy} />)
    fireEvent.click(screen.getByRole('button', { name: copy.dismiss }))
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('keeps the server render empty until browser detection is available', () => {
    expect(renderToString(<InAppBrowserNotice copy={copy} />)).toBe('')
  })

  it('does not show the reminder in Chrome', () => {
    override(window.navigator, 'userAgent', { value: ANDROID_CHROME })
    render(<InAppBrowserNotice copy={copy} />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('does not show the reminder inside a wallet with an injected provider', () => {
    override(window, 'ethereum', { value: { request: () => Promise.resolve() } })
    render(<InAppBrowserNotice copy={copy} />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('does not mistake an idle Telegram SDK for a Telegram Mini App', () => {
    override(window.navigator, 'userAgent', { value: IOS_SAFARI })
    override(window, 'Telegram', { value: { WebApp: { initData: '' } } })
    render(<InAppBrowserNotice copy={copy} />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('shows the selected language for every supported locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const localized = getWindMarketCopy(locale).inAppBrowserNotice
      const view = render(<InAppBrowserNotice copy={localized} />)
      expect(screen.getByText(localized.description)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: localized.dismiss })).toBeInTheDocument()
      view.unmount()
    }
  })
})
