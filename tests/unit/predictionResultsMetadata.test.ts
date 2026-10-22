import { describe, expect, it, mock } from 'bun:test'

void mock.module('next-intl/server', () => ({
  getExtracted: async () => (key: string) => key,
}))

void mock.module('@/lib/db/queries/tag', () => ({
  TagRepository: { getMainTags: async () => ({ data: [], globalChilds: [] }) },
}))

void mock.module('@/lib/theme-settings', () => ({
  loadRuntimeThemeState: async () => ({ site: { name: 'WindMarket 风向市场' } }),
}))

void mock.module('@/lib/site-url', () => ({ default: () => 'https://app.windmarket.top' }))

describe('prediction listing canonical URLs', () => {
  it('distinguishes the generic listing from the trending topic route', async () => {
    const { generatePredictionResultsMetadata } =
      await import('@/app/[locale]/(platform)/predictions/[slug]/_lib/prediction-results-page')

    const listing = await generatePredictionResultsMetadata({ locale: 'en', pageSlug: null, slug: 'trending' })
    const topic = await generatePredictionResultsMetadata({ locale: 'en', slug: 'trending' })

    expect(listing.alternates?.canonical).toBe('https://app.windmarket.top/en/predictions')
    expect(topic.alternates?.canonical).toBe('https://app.windmarket.top/en/predictions/trending')
    expect(listing.openGraph?.url).toBe(listing.alternates?.canonical)
    expect(topic.openGraph?.url).toBe(topic.alternates?.canonical)
  })

  it('preserves each language and topic in the canonical URL', async () => {
    const { generatePredictionResultsMetadata } =
      await import('@/app/[locale]/(platform)/predictions/[slug]/_lib/prediction-results-page')
    const traditional = await generatePredictionResultsMetadata({ locale: 'zh-hant', pageSlug: null, slug: 'trending' })
    const simplified = await generatePredictionResultsMetadata({ locale: 'zh', slug: 'bitcoin' })

    expect(traditional.alternates?.canonical).toBe('https://app.windmarket.top/predictions')
    expect(simplified.alternates?.canonical).toBe('https://app.windmarket.top/zh/predictions/bitcoin')
  })
})
