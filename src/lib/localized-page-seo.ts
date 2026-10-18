import type { Metadata, ResolvedMetadata } from 'next'

import type { SupportedLocale } from '@/i18n/locales'

import { normalizeEnabledLocales } from '@/i18n/locales'
import { withLocalePrefix } from '@/lib/locale-path'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

export function buildLocalizedPageMetadata({
  path,
  locale,
  enabledLocales,
  siteUrl,
  title,
  description,
  inherited,
}: {
  path: '/activity' | '/mentions' | '/tos'
  locale: SupportedLocale
  enabledLocales: SupportedLocale[]
  siteUrl: string
  title: string
  description: string
  inherited: Pick<ResolvedMetadata, 'openGraph' | 'twitter'>
}): Metadata {
  const locales = normalizeEnabledLocales(enabledLocales)
  const url = new URL(withLocalePrefix(path, locale), siteUrl).toString()
  const languages = Object.fromEntries(
    locales.map((language) => [language, new URL(withLocalePrefix(path, language), siteUrl).toString()]),
  )
  languages['x-default'] = new URL(path, siteUrl).toString()

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: inherited.openGraph?.siteName ?? undefined,
      locale: getWindMarketCopy(locale).ogLocale,
      alternateLocale: locales
        .filter((language) => language !== locale)
        .map((language) => getWindMarketCopy(language).ogLocale),
      images: inherited.openGraph?.images ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: inherited.twitter?.images ?? [],
    },
  }
}
