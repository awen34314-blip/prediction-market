import { describe, expect, it } from 'bun:test'

import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { buildLocalizedPageMetadata } from '@/lib/localized-page-seo'

describe('localized public-page metadata', () => {
  it('shares each page under its own canonical URL in every enabled language', () => {
    for (const path of ['/activity', '/mentions', '/tos'] as const) {
      for (const locale of SUPPORTED_LOCALES) {
        const metadata = buildLocalizedPageMetadata({
          path,
          locale,
          enabledLocales: [...SUPPORTED_LOCALES],
          siteUrl: 'https://app.windmarket.top',
          title: 'Page title',
          description: 'Page description',
          inherited: { openGraph: null, twitter: null },
        })
        const expected = `https://app.windmarket.top${locale === 'zh-hant' ? '' : `/${locale}`}${path}`
        expect(metadata.alternates?.canonical).toBe(expected)
        expect(metadata.openGraph).toMatchObject({
          url: expected,
          type: 'website',
          title: 'Page title',
          description: 'Page description',
        })
        expect(metadata.alternates?.languages?.[locale]).toBe(expected)
        expect(metadata.alternates?.languages?.['x-default']).toBe(`https://app.windmarket.top${path}`)
      }
    }
  })

  it('preserves the configured social identity and images without advertising disabled locales', () => {
    const image = { url: new URL('https://app.windmarket.top/api/og'), width: 1200, height: 630 }
    const metadata = buildLocalizedPageMetadata({
      path: '/activity',
      locale: 'en',
      enabledLocales: ['en'],
      siteUrl: 'https://app.windmarket.top',
      title: 'Activity',
      description: 'Recent activity',
      inherited: {
        openGraph: { type: 'website', siteName: 'Configured brand', images: [image] },
        twitter: { card: 'summary_large_image', images: [image] },
      },
    })
    expect(metadata.openGraph).toMatchObject({ siteName: 'Configured brand', images: [image] })
    expect(metadata.twitter).toMatchObject({ title: 'Activity', description: 'Recent activity', images: [image] })
    expect(metadata.alternates?.languages).toEqual({
      en: 'https://app.windmarket.top/en/activity',
      'zh-hant': 'https://app.windmarket.top/activity',
      'x-default': 'https://app.windmarket.top/activity',
    })
  })
})
