import type { Metadata, MetadataRoute, ResolvedMetadata } from 'next'

import type { SupportedLocale } from '@/i18n/locales'
import type { StructuredDataNode } from '@/lib/structured-data'
import type { WindMarketResourceId, WindMarketResourceLocale } from '@/lib/windmarket/resources'

import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'
import {
  getWindMarketResourceHref,
  getWindMarketResourceLanguages,
  getWindMarketResourceLocales,
  windmarketResources,
} from '@/lib/windmarket/resources'

export function buildWindMarketResourceMetadata({
  id,
  locale,
  enabledLocales,
  siteUrl,
  inherited,
}: {
  id: WindMarketResourceId
  locale: WindMarketResourceLocale
  enabledLocales: SupportedLocale[]
  siteUrl: string
  inherited: Pick<ResolvedMetadata, 'openGraph' | 'twitter'>
}): Metadata {
  const copy = windmarketResources[id].copy[locale]
  const url = new URL(getWindMarketResourceHref(id, locale), siteUrl).toString()
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: url, languages: getWindMarketResourceLanguages(id, enabledLocales, siteUrl) },
    openGraph: {
      type: 'website',
      title: copy.title,
      description: copy.description,
      siteName: windmarket.name,
      url,
      locale: getWindMarketCopy(locale).ogLocale,
      alternateLocale: getWindMarketResourceLocales(enabledLocales)
        .filter((language) => language !== locale)
        .map((language) => getWindMarketCopy(language).ogLocale),
      images: inherited.openGraph?.images ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: inherited.twitter?.images ?? [],
    },
  }
}

export function buildWindMarketResourceSitemap(
  siteUrl: string,
  enabledLocales: SupportedLocale[],
): MetadataRoute.Sitemap {
  return (Object.keys(windmarketResources) as WindMarketResourceId[]).flatMap((id) =>
    getWindMarketResourceLocales(enabledLocales).map((locale) => ({
      url: new URL(getWindMarketResourceHref(id, locale), siteUrl).toString(),
      lastModified: windmarketResources[id].updated,
      alternates: { languages: getWindMarketResourceLanguages(id, enabledLocales, siteUrl) },
    })),
  )
}

export function buildWindMarketResourceStructuredData(
  id: WindMarketResourceId,
  locale: WindMarketResourceLocale,
  siteUrl: string,
): StructuredDataNode {
  const resource = windmarketResources[id]
  const copy = resource.copy[locale]
  const url = new URL(getWindMarketResourceHref(id, locale), siteUrl).toString()
  const root = siteUrl.replace(/\/$/, '')
  const breadcrumbId = `${url}#breadcrumb`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': id === 'about' ? 'AboutPage' : 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: locale,
        dateModified: resource.updated,
        isPartOf: { '@id': `${root}#website` },
        about: { '@id': `${root}#organization` },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'zh' ? '风向市场' : 'WindMarket',
            item: new URL(locale === 'zh' ? '/zh' : '/', siteUrl).toString(),
          },
          { '@type': 'ListItem', position: 2, name: copy.label, item: url },
        ],
      },
    ],
  }
}
