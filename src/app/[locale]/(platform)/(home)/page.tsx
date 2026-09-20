import type { Metadata, ResolvingMetadata } from 'next'

import HomeInitialContent from '@/app/[locale]/(platform)/(home)/_components/HomeInitialContent'
import { loadEnabledLocales } from '@/i18n/locale-settings'
import { getRootLocale } from '@/i18n/root-locale'
import resolveSiteUrl from '@/lib/site-url'
import { buildWindMarketHomeMetadata } from '@/lib/windmarket/seo'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, enabledLocales, inherited] = await Promise.all([getRootLocale(), loadEnabledLocales(), parent])
  return buildWindMarketHomeMetadata({ locale, enabledLocales, inherited, siteUrl: resolveSiteUrl(process.env) })
}

export default async function HomePage() {
  return <HomeInitialContent />
}
