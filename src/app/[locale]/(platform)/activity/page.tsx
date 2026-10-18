import type { Metadata, ResolvingMetadata } from 'next'

import { getExtracted } from 'next-intl/server'

import ActivityFeed from '@/app/[locale]/(platform)/activity/_components/ActivityFeed'
import { loadEnabledLocales } from '@/i18n/locale-settings'
import { getRootLocale } from '@/i18n/root-locale'
import { buildLocalizedPageMetadata } from '@/lib/localized-page-seo'
import resolveSiteUrl from '@/lib/site-url'
import { loadRuntimeThemeState } from '@/lib/theme-settings'

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [t, runtimeTheme, locale, enabledLocales, inherited] = await Promise.all([
    getExtracted(),
    loadRuntimeThemeState(),
    getRootLocale(),
    loadEnabledLocales(),
    parent,
  ])
  const siteName = runtimeTheme.site.name

  return buildLocalizedPageMetadata({
    path: '/activity',
    locale,
    enabledLocales,
    inherited,
    siteUrl: resolveSiteUrl(process.env),
    title: t('Activity'),
    description: t('See recent trading activity on {siteName}', { siteName }),
  })
}

export default async function ActivityPage() {
  'use cache'

  return (
    <main className="container py-6 md:py-8">
      <ActivityFeed />
    </main>
  )
}
