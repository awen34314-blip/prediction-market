import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'

import type { WindMarketResourceId } from '@/lib/windmarket/resources'

import StructuredDataScript from '@/components/seo/StructuredDataScript'
import ResourceArticle from '@/components/windmarket/ResourceArticle'
import ResourceLinks from '@/components/windmarket/ResourceLinks'
import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { isDynamicHomeCategorySlug } from '@/lib/platform-routing'
import {
  buildWindMarketResourceMetadata,
  buildWindMarketResourceSitemap,
  buildWindMarketResourceStructuredData,
} from '@/lib/windmarket/resource-seo'
import { isWindMarketResourcePath, windmarketResources } from '@/lib/windmarket/resources'

const siteUrl = 'https://app.windmarket.top'
const ids = Object.keys(windmarketResources) as WindMarketResourceId[]
const inherited = { openGraph: null, twitter: null }

describe('WindMarket editorial SEO', () => {
  it('publishes only actual translations, with matching sitemap and HTML canonicals', () => {
    const enabledLocales = [...SUPPORTED_LOCALES]
    const sitemap = buildWindMarketResourceSitemap(siteUrl, enabledLocales)
    expect(sitemap).toHaveLength(8)
    expect(new Set(sitemap.map((entry) => entry.url)).size).toBe(8)
    for (const id of ids) {
      const english = buildWindMarketResourceMetadata({ id, locale: 'en', siteUrl, enabledLocales, inherited })
      const chinese = buildWindMarketResourceMetadata({ id, locale: 'zh', siteUrl, enabledLocales, inherited })
      expect(english.alternates?.languages).toEqual(chinese.alternates?.languages)
      expect(Object.keys(english.alternates?.languages ?? {})).toEqual(['en', 'zh', 'x-default'])
      expect(english.description).not.toBe(chinese.description)
      for (const metadata of [english, chinese]) {
        const entry = sitemap.find((item) => item.url === metadata.alternates?.canonical)
        expect(entry?.lastModified).toBe(windmarketResources[id].updated)
        expect(entry?.alternates?.languages).toEqual(metadata.alternates?.languages)
      }
      expect(english.alternates?.canonical).toBe(`${siteUrl}${windmarketResources[id].path}`)
      expect(chinese.alternates?.canonical).toBe(`${siteUrl}/zh${windmarketResources[id].path}`)
    }
  })

  it('does not advertise disabled Chinese pages and always retains English fallback', () => {
    for (const enabledLocales of [[], ['en'], ['de']] as const) {
      const sitemap = buildWindMarketResourceSitemap(siteUrl, [...enabledLocales])
      expect(sitemap).toHaveLength(4)
      for (const entry of sitemap) {
        expect(entry.alternates?.languages).toEqual({ en: entry.url, 'x-default': entry.url })
        expect(entry.url).not.toContain('/zh/')
      }
    }
  })

  it('limits the alternate-header exception to the four editorial routes', () => {
    expect(isWindMarketResourcePath('/about')).toBe(true)
    expect(isWindMarketResourcePath('/learn/southeast-asia/')).toBe(true)
    expect(isWindMarketResourcePath('/learn/bitcoin-up-or-down')).toBe(true)
    for (const path of [
      '/',
      '/admin',
      '/portfolio',
      '/settings',
      '/event/about',
      '/learn',
      '/learn/unknown',
      '/about-us',
    ]) {
      expect(isWindMarketResourcePath(path)).toBe(false)
    }
    expect(isDynamicHomeCategorySlug('about')).toBe(false)
    expect(isDynamicHomeCategorySlug('learn')).toBe(false)
    expect(isDynamicHomeCategorySlug('crypto')).toBe(true)
  })

  it('serves readable content and navigation without client rendering', () => {
    for (const id of ids) {
      for (const locale of ['en', 'zh'] as const) {
        const html = renderToStaticMarkup(<ResourceArticle id={id} locale={locale} languages={['en', 'zh']} />)
        expect(html.match(/<h1>/g)).toHaveLength(1)
        expect(html).toContain(windmarketResources[id].copy[locale].heading)
        expect(html).toContain('<article')
        expect(html).toContain('https://t.me/WindMarketOfficial')
        expect(html).toContain(`href="/zh${windmarketResources[id].path}"`)
        expect(html).toContain(`href="${windmarketResources[id].path}"`)
        expect(html).not.toContain('<script')
      }
    }
    const oneLanguage = renderToStaticMarkup(<ResourceArticle id="about" locale="en" languages={['en']} />)
    expect(oneLanguage).not.toContain('href="/zh/about"')
    const germanFooter = renderToStaticMarkup(<ResourceLinks locale="de" />)
    expect(germanFooter).toContain('href="/learn/southeast-asia" hrefLang="en"')
    expect(germanFooter).not.toContain('/de/learn/')
  })

  it('links page and breadcrumb data to the existing brand graph without duplicate site identities', () => {
    for (const id of ids) {
      const data = buildWindMarketResourceStructuredData(id, 'zh', `${siteUrl}/`)
      const html = renderToStaticMarkup(<StructuredDataScript data={data} />)
      expect(html).toContain(`${siteUrl}#website`)
      expect(html).toContain(`${siteUrl}#organization`)
      expect(html).toContain('BreadcrumbList')
      expect(html).toContain(`${siteUrl}/zh${windmarketResources[id].path}#webpage`)
      expect(html).not.toContain('"@type":"WebSite"')
      expect(html).not.toContain('"@type":"Organization"')
    }
  })
})
