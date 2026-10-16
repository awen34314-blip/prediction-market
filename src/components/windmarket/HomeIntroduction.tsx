import type { SupportedLocale } from '@/i18n/locales'

import { getWindMarketCopy } from '@/lib/windmarket/localization'
import { getWindMarketResourceHref, windmarketResources } from '@/lib/windmarket/resources'

export default function HomeIntroduction({ locale }: { locale: SupportedLocale }) {
  const copy = getWindMarketCopy(locale)
  const resourceLocale = locale === 'zh-hant' ? 'zh-hant' : locale === 'zh' ? 'zh' : 'en'

  return (
    <header className="max-w-3xl space-y-2" aria-labelledby="windmarket-home-title">
      <h1 id="windmarket-home-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
        {copy.title}
      </h1>
      <p className="text-sm/6 text-muted-foreground">{copy.description}</p>
      <a
        href={getWindMarketResourceHref('about', locale)}
        hrefLang={resourceLocale}
        className="inline-block text-sm font-medium text-primary hover:underline"
      >
        {windmarketResources.about.copy[resourceLocale].label}
      </a>
    </header>
  )
}
