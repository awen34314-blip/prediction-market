import type { WindMarketResourceId } from '@/lib/windmarket/resources'

import { getWindMarketResourceHref, windmarketResources } from '@/lib/windmarket/resources'

export default function ResourceLinks({ locale, current }: { locale: string; current?: WindMarketResourceId }) {
  const language = locale === 'zh' ? 'zh' : 'en'
  return (
    <nav className="wm-resource-links" aria-label={language === 'zh' ? '了解风向市场' : 'Learn about WindMarket'}>
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
