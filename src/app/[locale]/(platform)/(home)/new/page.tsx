import type { Metadata } from 'next'

import HomeInitialContent from '@/app/[locale]/(platform)/(home)/_components/HomeInitialContent'
import { loadEnabledLocales } from '@/i18n/locale-settings'
import { getRootLocale } from '@/i18n/root-locale'
import { buildLocalizedPageAlternates } from '@/lib/localized-page-seo'
import { getNewPageSeoTitle } from '@/lib/platform-routing'
import resolveSiteUrl from '@/lib/site-url'

const MAIN_TAG_SLUG = 'new' as const

export async function generateMetadata(): Promise<Metadata> {
  const [locale, enabledLocales] = await Promise.all([getRootLocale(), loadEnabledLocales()])

  return {
    title: getNewPageSeoTitle(),
    alternates: buildLocalizedPageAlternates({
      path: '/new',
      locale,
      enabledLocales,
      siteUrl: resolveSiteUrl(process.env),
    }),
  }
}

export default async function NewPage() {
  return <HomeInitialContent initialTag={MAIN_TAG_SLUG} />
}
