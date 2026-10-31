import type { WindMarketResourceId } from '@/lib/windmarket/resources'

import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketResourceHref, windmarketResources } from '@/lib/windmarket/resources'

export default function ResourceLinks({
  locale,
  current,
  includeWebsite = false,
}: {
  locale: string
  current?: WindMarketResourceId
  includeWebsite?: boolean
}) {
  const language = locale === 'zh-hant' ? 'zh-hant' : locale === 'zh' ? 'zh' : 'en'
  return (
    <nav
      className="wm-resource-links"
      aria-label={
        language === 'zh-hant' ? '瞭解風向市場' : language === 'zh' ? '了解风向市场' : 'Learn about WindMarket'
      }
    >
      {includeWebsite && (
        <a
          href={`${windmarket.website}${language === 'zh-hant' ? '/' : `/${language}`}`}
          hrefLang={language === 'zh' ? 'zh-Hans' : language === 'zh-hant' ? 'zh-Hant' : 'en'}
        >
          {language === 'zh-hant'
            ? '風向市場 WindMarket 官網'
            : language === 'zh'
              ? '风向市场 WindMarket 官网'
              : 'WindMarket official website'}
        </a>
      )}
      {(Object.keys(windmarketResources) as WindMarketResourceId[]).map((id) => (
        <a
          key={id}
          href={getWindMarketResourceHref(id, locale)}
          hrefLang={language}
          aria-current={id === current ? 'page' : undefined}
        >
          {windmarketResources[id].copy[language].label}
        </a>
      ))}
    </nav>
  )
}
