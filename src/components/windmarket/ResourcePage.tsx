import type { ResolvingMetadata, Route } from 'next'

import { permanentRedirect } from 'next/navigation'
import { cache } from 'react'

import type { WindMarketResourceId } from '@/lib/windmarket/resources'

import StructuredDataScript from '@/components/seo/StructuredDataScript'
import ResourceArticle from '@/components/windmarket/ResourceArticle'
import { loadEnabledLocales } from '@/i18n/locale-settings'
import { getRootLocale } from '@/i18n/root-locale'
import resolveSiteUrl from '@/lib/site-url'
import { buildWindMarketResourceMetadata, buildWindMarketResourceStructuredData } from '@/lib/windmarket/resource-seo'
import { getWindMarketResourceLocales, windmarketResources } from '@/lib/windmarket/resources'

const getResourceContext = cache(async (id: WindMarketResourceId) => {
  const [requestedLocale, enabledLocales] = await Promise.all([getRootLocale(), loadEnabledLocales()])
  const languages = getWindMarketResourceLocales(enabledLocales)
  if (
    (requestedLocale !== 'en' && requestedLocale !== 'zh') ||
    !languages.some((locale) => locale === requestedLocale)
  ) {
    permanentRedirect(windmarketResources[id].path as Route)
  }
  return { locale: requestedLocale, enabledLocales, languages, siteUrl: resolveSiteUrl(process.env) }
})

export async function generateResourceMetadata(id: WindMarketResourceId, parent: ResolvingMetadata) {
  const [context, inherited] = await Promise.all([getResourceContext(id), parent])
  return buildWindMarketResourceMetadata({ id, ...context, inherited })
}

export default async function ResourcePage({ id }: { id: WindMarketResourceId }) {
  const { locale, languages, siteUrl } = await getResourceContext(id)
  return (
    <>
      <StructuredDataScript data={buildWindMarketResourceStructuredData(id, locale, siteUrl)} />
      <ResourceArticle id={id} locale={locale} languages={languages} />
    </>
  )
}
