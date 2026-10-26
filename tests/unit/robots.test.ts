import { afterEach, describe, expect, it } from 'bun:test'

import robots from '@/app/robots'

const previousPrerender = process.env.BUILD_PRERENDER_PUBLIC_SHELL

afterEach(() => {
  if (previousPrerender === undefined) {
    delete process.env.BUILD_PRERENDER_PUBLIC_SHELL
    return
  }
  process.env.BUILD_PRERENDER_PUBLIC_SHELL = previousPrerender
})

describe('public page crawl dependencies', () => {
  it('allows homepage data without opening the rest of the API path to crawlers', async () => {
    process.env.BUILD_PRERENDER_PUBLIC_SHELL = 'true'
    const result = await robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const rule = rules.find((entry) => entry.userAgent === '*')!
    const entries = [
      ...[rule.allow]
        .flat()
        .filter((path): path is string => Boolean(path))
        .map((path) => ({ path, allow: true })),
      ...[rule.disallow]
        .flat()
        .filter((path): path is string => Boolean(path))
        .map((path) => ({ path, allow: false })),
    ]
    // Google applies the longest matching path, with $ marking an exact ending.
    function canCrawl(url: string) {
      return (
        entries
          .filter(({ path }) => (path.endsWith('$') ? url === path.slice(0, -1) : url.startsWith(path)))
          .sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow))[0]?.allow ?? true
      )
    }

    for (const url of [
      '/',
      '/zh',
      '/en',
      '/_next/static/immutable/main.css',
      '/api/events',
      '/api/events?locale=zh&homeFeed=true',
      '/api/locales',
      '/api/locales?',
    ]) {
      expect(canCrawl(url)).toBe(true)
    }
    for (const url of [
      '/api/auth/get-session',
      '/api/payments/meld/checkouts',
      '/api/portfolio',
      '/api/events/private',
      '/api/events-admin',
      '/api/locales-settings',
    ]) {
      expect(canCrawl(url)).toBe(false)
    }
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/)
  })
})
