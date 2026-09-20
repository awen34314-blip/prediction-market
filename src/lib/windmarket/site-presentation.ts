import { resolveSupportedLocale } from '@/i18n/locales'
import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

const brandNames = new Set<string>([windmarket.name, ...windmarket.alternateNames].map((name) => name.toLowerCase()))

/** Localize display copy without changing the configured identity used by integrations. */
export function getSitePresentation<T extends { name: string; description: string }>(site: T, locale: string): T {
  if (!brandNames.has(site.name.trim().replace(/\s+/g, ' ').toLowerCase())) {
    return site
  }

  return {
    ...site,
    name: resolveSupportedLocale(locale) === 'zh' ? '风向市场' : 'WindMarket',
    description: getWindMarketCopy(locale).description,
  }
}
