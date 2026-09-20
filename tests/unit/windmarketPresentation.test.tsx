import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'

import CommunityBar from '@/components/windmarket/CommunityBar'
import DepositSupport from '@/components/windmarket/DepositSupport'
import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { withoutMigratedWindMarketIntegrations } from '@/lib/windmarket/legacy-integrations'
import { buildWindMarketHomeMetadata } from '@/lib/windmarket/seo'
import { getSitePresentation } from '@/lib/windmarket/site-presentation'

describe('WindMarket native presentation', () => {
  it('uses a single localized display name without mutating the configured identity', () => {
    const site = {
      name: 'WindMarket 风向市场',
      description: 'Saved bilingual description',
      logoImageUrl: '/logo.png',
      supportUrl: 'https://t.me/WindMarketOfficial',
    }
    const chinese = getSitePresentation(site, 'zh')
    const english = getSitePresentation(site, 'en')
    expect(chinese.name).toBe('风向市场')
    expect(english.name).toBe('WindMarket')
    expect(chinese.description).toContain('东南亚预测市场')
    expect(english.description).not.toMatch(/[\u3400-\u9fff]/)
    expect(chinese.logoImageUrl).toBe(site.logoImageUrl)
    expect(chinese.supportUrl).toBe(site.supportUrl)
    expect(site.name).toBe('WindMarket 风向市场')
    expect(site.description).toBe('Saved bilingual description')
    for (const name of ['WindMarket', '风向市场', 'windmarket 风向市场']) {
      expect(getSitePresentation({ ...site, name }, 'en').name).toBe('WindMarket')
    }
  })

  it('preserves other white-label identities and their configured description', () => {
    const site = { name: 'Kuest', description: 'Operator description' }
    expect(getSitePresentation(site, 'zh')).toBe(site)
  })

  it('renders the community bar on the server before user interaction', () => {
    const html = renderToStaticMarkup(<CommunityBar locale="zh" />)
    expect(html).toContain('风向市场社区')
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
    expect(chinese.title).toEqual({ absolute: '东南亚预测市场｜风向市场 WindMarket' })
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
