import type { Route } from 'next'

import { describe, expect, it } from 'bun:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import DocsLink from '@/components/DocsLink'
import { SUPPORTED_LOCALES } from '@/i18n/locales'
import { buildCanonicalDocsSitemap, getCanonicalDocsPath, isDocsPagePath } from '@/lib/docs-seo'
import { withLocalePrefix } from '@/lib/locale-path'

describe('single-source documentation SEO', () => {
  it('consolidates language-shell copies of each English document into one indexable URL', () => {
    const paths = ['/docs', '/docs/api-reference/trade/cancel-orders-for-a-market']
    const localized = paths.flatMap((path) =>
      SUPPORTED_LOCALES.map((locale) => ({ path: withLocalePrefix(path, locale) })),
    )
    const sitemap = buildCanonicalDocsSitemap(localized, 'https://app.windmarket.top')

    expect(sitemap).toEqual(paths.map((path) => ({ url: `https://app.windmarket.top${path}` })))
    for (const { path } of localized) {
      expect(sitemap.some(({ url }) => url === `https://app.windmarket.top${getCanonicalDocsPath(path)}`)).toBe(true)
    }
    expect(sitemap.every((entry) => !entry.alternates && !entry.lastModified)).toBe(true)
  })

  it('includes API reference documents while keeping documentation API endpoints and other pages out', () => {
    expect(isDocsPagePath('/en/docs/api-reference')).toBe(true)
    expect(isDocsPagePath('/zh/docs/api/search')).toBe(false)
    expect(isDocsPagePath('/docs/api/proxy')).toBe(false)
    expect(isDocsPagePath('/en/about')).toBe(false)
    expect(getCanonicalDocsPath('/zh/docs/help-support/faq/')).toBe('/docs/help-support/faq')
  })

  it('renders links directly to the canonical document instead of a locale-prefixed redirect', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const html = renderToStaticMarkup(
        createElement(
          DocsLink,
          {
            href: withLocalePrefix('/docs/api-reference', locale) as Route,
            locale,
          },
          'Documentation',
        ),
      )
      expect(html).toContain('href="/docs/api-reference"')
      expect(html).not.toContain(`href="/${locale}/docs`)
    }
  })
})
