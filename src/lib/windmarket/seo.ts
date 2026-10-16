import type { Metadata, ResolvedMetadata } from 'next'

import type { SupportedLocale } from '@/i18n/locales'

import { normalizeEnabledLocales } from '@/i18n/locales'
import { withLocalePrefix } from '@/lib/locale-path'
import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

export function buildWindMarketHomeMetadata({
  locale,
  enabledLocales,
  siteUrl,
  inherited,
}: {
  locale: SupportedLocale
  enabledLocales: SupportedLocale[]
  siteUrl: string
  inherited: Pick<ResolvedMetadata, 'openGraph' | 'twitter'>
}): Metadata {
  const copy = getWindMarketCopy(locale)
  const locales = normalizeEnabledLocales(enabledLocales)
  const pageUrl = new URL(withLocalePrefix('/', locale), siteUrl).toString()
  const languages = Object.fromEntries(
    locales.map((language) => [language, new URL(withLocalePrefix('/', language), siteUrl).toString()]),
  )
  languages['x-default'] = new URL('/', siteUrl).toString()

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: pageUrl, languages },
    openGraph: {
      type: 'website',
      title: copy.title,
      description: copy.description,
      siteName: windmarket.name,
      url: pageUrl,
      locale: copy.ogLocale,
      alternateLocale: locales
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
