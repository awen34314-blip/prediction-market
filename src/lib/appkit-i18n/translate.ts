import type { SupportedLocale } from '@/i18n/locales'

import ar from './messages/ar.json'
import de from './messages/de.json'
import en from './messages/en.json'
import es from './messages/es.json'
import fr from './messages/fr.json'
import it from './messages/it.json'
import ja from './messages/ja.json'
import ko from './messages/ko.json'
import pl from './messages/pl.json'
import pt from './messages/pt.json'
import ru from './messages/ru.json'
import zhHant from './messages/zh-hant.json'
import zh from './messages/zh.json'

export const appKitMessages = { en, de, es, pt, fr, zh, 'zh-hant': zhHant, ja, ar, ru, it, pl, ko } satisfies Record<
  SupportedLocale,
  Record<keyof typeof en, string>
>

const aliases: Record<string, keyof typeof en> = {
  'Search wallet': 'Search Wallet',
  INSTALLED: 'Installed',
  'QR code': 'QR CODE',
  'qr code': 'QR CODE',
  installed: 'Installed',
  'Get a wallet': 'Get a Wallet',
  'Try Again': 'Try again',
  '. Try Again': 'Try again',
  'Accept connection request in your wallet': 'Accept connection request in the wallet',
  'privacy policy': 'Privacy Policy',
  'terms of service': 'Terms of Service',
  'Sign in': 'Sign In',
}

// Anchored SDK templates only: unknown provider errors and user data stay verbatim.
const templates: [RegExp, keyof typeof en, string][] = [
  [/^Continue with (.+)$/, 'Continue with {provider}', 'provider'],
  [/^Continue in (.+)$/, 'Continue in {provider}', 'provider'],
  [/^Resend in (\d+)s$/, 'Resend in {seconds}s', 'seconds'],
  [/^Try again in (\d+)s$/, 'Try again in {seconds}s', 'seconds'],
  [/^Switching to (.+) network\.\.\.$/, 'Switching to {network} network...', 'network'],
  [/^Don't have (.+)\?$/, "Don't have {provider}?", 'provider'],
  [/^Get (.+)$/, 'Get {provider}', 'provider'],
  [/^Open (.+)$/, 'Open {provider}', 'provider'],
]

export function translateAppKitText(source: string, locale: SupportedLocale): string {
  if (locale === 'en') {
    return source
  }
  const normalized = source.trim().replace(/\s+/g, ' ')
  const key = aliases[normalized] ?? normalized
  const messages: Record<string, string> = appKitMessages[locale]
  let translated = Object.hasOwn(messages, key) ? messages[key] : undefined
  if (!translated) {
    for (const [pattern, template, variable] of templates) {
      const match = normalized.match(pattern)
      if (match) {
        translated = messages[template]?.replace(`{${variable}}`, () => match[1]!)
        break
      }
    }
  }
  if (!translated) {
    return source
  }
  // Preserve spacing between Lit's static text nodes and dynamic provider/email nodes.
  return source.replace(/\S[\s\S]*\S|\S/, () => translated!)
}
