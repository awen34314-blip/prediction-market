import type { Metadata } from 'next'

import { getExtracted } from 'next-intl/server'

import SportsFeedPageContent from '@/app/[locale]/(platform)/sports/_components/SportsFeedPageContent'
import { loadRuntimeThemeState } from '@/lib/theme-settings'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getExtracted()

  const runtimeTheme = await loadRuntimeThemeState()
  const siteName = runtimeTheme.site.name

  return {
    title: t('Esports Prediction Markets & Live Probabilities'),
    description: t(
      'Explore prediction markets on {siteName}. Review outcome probabilities, share prices, and settlement rules before trading.',
      { siteName },
    ),
  }
}

export default async function EsportsLivePage() {
  const t = await getExtracted()

  return <SportsFeedPageContent sportSlug="live" sportTitle={t('Live')} pageMode="liveAndSoon" vertical="esports" />
}
