interface InAppBrowserEnvironment {
  userAgent: string
  isStandalone?: boolean
  hasWalletProvider?: boolean
  hasTelegramBridge?: boolean
}

// Use positive app markers. A missing Safari token does not prove an iOS WebView.
const APP_BROWSER_PATTERN =
  /MicroMessenger|\bQQ\/|FBAN\/|FBAV\/|FB_IAB\/|Instagram|\bLine\/|TikTok|BytedanceWebview|musical_ly|\bTelegram\b/i
const ANDROID_WEBVIEW_PATTERN = /Android.*;\s*wv\)/i
const WALLET_BROWSER_PATTERN =
  /MetaMask|TrustWallet|Trust\/|CoinbaseWallet|CoinbaseBrowser|OKApp|OKX|TokenPocket|imToken|Rabby|Rainbow|Phantom|BitgetWallet/i

export function isInAppBrowser({
  userAgent,
  isStandalone = false,
  hasWalletProvider = false,
  hasTelegramBridge = false,
}: InAppBrowserEnvironment) {
  // Wallet browsers and installed PWAs are intentional places to use the app.
  if (isStandalone || hasWalletProvider || WALLET_BROWSER_PATTERN.test(userAgent)) {
    return false
  }

  return hasTelegramBridge || APP_BROWSER_PATTERN.test(userAgent) || ANDROID_WEBVIEW_PATTERN.test(userAgent)
}
