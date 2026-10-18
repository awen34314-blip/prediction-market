import type { Metadata, ResolvingMetadata } from 'next'

import { Suspense } from 'react'

import EventsGridSkeleton from '@/app/[locale]/(platform)/(home)/_components/EventsGridSkeleton'
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

export default function HomePage() {
  return (
    <main className="container grid gap-4 py-4">
      <Suspense fallback={<EventsGridSkeleton />}>
        <HomeInitialContent withPageWrapper={false} />
      </Suspense>
    </main>
  )
}
