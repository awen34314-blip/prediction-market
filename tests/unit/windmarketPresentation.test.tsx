import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'

import CommunityBar from '@/components/windmarket/CommunityBar'
import DepositSupport from '@/components/windmarket/DepositSupport'
import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { withoutMigratedWindMarketIntegrations } from '@/lib/windmarket/legacy-integrations'
import { buildWindMarketHomeMetadata } from '@/lib/windmarket/seo'

describe('WindMarket native presentation', () => {
  it('renders the community bar on the server before user interaction', () => {
    const html = renderToStaticMarkup(<CommunityBar locale="zh" />)
    expect(html).toContain('WindMarket 社区')
    expect(html).toContain('加入社区')
    expect(html).toContain('https://t.me/WindMarketOfficial')
    expect(html).not.toContain('<script')
  })

  it('renders a localized support link without a connected wallet or payment action', () => {
    const english = renderToStaticMarkup(<DepositSupport locale="en" />)
    const chinese = renderToStaticMarkup(<DepositSupport locale="zh" />)
    expect(english).toContain('Deposit support')
    expect(chinese).toContain('充值客服')
    expect(english).toContain('rel="noopener noreferrer"')
    expect(english).toContain('https://t.me/WindMarketOfficial')
    expect(english).not.toContain('0x')
    expect(chinese).not.toContain('<script')
  })

  it('suppresses migrated widgets while preserving unrelated integrations', () => {
    const snippets = [
      'window.__wmBrandV1 = true',
      'window.__wmHomeV1 = true',
      'window.__wmCommunityBarV2 = true',
      'window.__windMarketDepositHelp = true',
      'window.analytics = true',
    ].map((snippet) => ({ name: 'Saved integration', snippet: `<script>${snippet}</script>`, disabledOn: [] }))
    expect(withoutMigratedWindMarketIntegrations(snippets)).toEqual([snippets[4]!])
    expect(snippets).toHaveLength(5)
  })
})

describe('WindMarket localized homepage SEO', () => {
  const siteUrl = 'https://app.windmarket.top'
  const inherited = { openGraph: null, twitter: null }

  it('gives English and Chinese their own canonical URLs and reciprocal language links', () => {
    const english = buildWindMarketHomeMetadata({ locale: 'en', enabledLocales: ['en', 'zh'], siteUrl, inherited })
    const chinese = buildWindMarketHomeMetadata({ locale: 'zh', enabledLocales: ['en', 'zh'], siteUrl, inherited })
    expect(english.alternates?.canonical).toBe(`${siteUrl}/`)
    expect(chinese.alternates?.canonical).toBe(`${siteUrl}/zh`)
    expect(chinese.alternates?.languages).toEqual(english.alternates?.languages)
    expect(chinese.alternates?.languages).toEqual({
      en: `${siteUrl}/`,
      zh: `${siteUrl}/zh`,
      'x-default': `${siteUrl}/`,
    })
    expect(chinese.title).toEqual({ absolute: 'WindMarket 风向市场｜真实世界事件预测市场' })
    expect(chinese.description).not.toBe(english.description)
    expect(chinese.openGraph).toMatchObject({ url: `${siteUrl}/zh`, locale: 'zh_CN', alternateLocale: ['en_US'] })
  })

  it('does not advertise disabled language routes', () => {
    const metadata = buildWindMarketHomeMetadata({ locale: 'en', enabledLocales: ['en'], siteUrl, inherited })
    expect(metadata.alternates?.languages).toEqual({ en: `${siteUrl}/`, 'x-default': `${siteUrl}/` })
    expect(metadata.openGraph).toMatchObject({ alternateLocale: [] })
  })

  it('has translated metadata for every supported locale', () => {
    const descriptions = new Set<string>()
    for (const locale of SUPPORTED_LOCALES) {
      const metadata = buildWindMarketHomeMetadata({
        locale,
        enabledLocales: [...SUPPORTED_LOCALES],
        siteUrl,
        inherited,
      })
      expect(metadata.description).toBeTruthy()
      descriptions.add(metadata.description!)
      expect(metadata.alternates?.canonical).toBe(locale === 'en' ? `${siteUrl}/` : `${siteUrl}/${locale}`)
    }
    expect(descriptions.size).toBe(SUPPORTED_LOCALES.length)
  })

  it('preserves the configured social preview images', () => {
    const image = { url: new URL('/api/og', siteUrl), width: 1200, height: 630 }
    const metadata = buildWindMarketHomeMetadata({
      locale: 'zh',
      enabledLocales: ['en', 'zh'],
      siteUrl,
      inherited: { openGraph: { images: [image], type: 'website' }, twitter: null },
    })
    expect(metadata.openGraph?.images).toEqual([image])
  })
})
