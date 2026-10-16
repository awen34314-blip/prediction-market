import type { ReactElement } from 'react'

import { describe, expect, it, mock } from 'bun:test'
import { createNavigation } from 'next-intl/navigation'

import type { SupportedLocale } from '@/i18n/locales'

import { routing } from '@/i18n/routing'
import resolveSiteUrl from '@/lib/site-url'

let currentLocale: SupportedLocale = 'zh'

mock.module('@/i18n/root-locale', () => ({ getRootLocale: async () => currentLocale }))
mock.module('@/lib/theme-settings', () => ({
  loadRuntimeThemeState: async () => ({ site: { name: 'WindMarket', discordLink: '' } }),
}))
mock.module('@/lib/source', () => ({ source: { pageTree: {} } }))
mock.module('fumadocs-ui/layouts/docs', () => ({ DocsLayout: () => null }))

const { default: Layout } = await import('@/app/[locale]/docs/[[...slug]]/layout')
const { getPathname } = createNavigation(routing)

describe('documentation guide navigation', () => {
  it('keeps one language prefix when the documentation provider resolves each guide link', async () => {
    for (const locale of ['zh', 'en', 'zh-hant', 'ko'] as const) {
      currentLocale = locale
      const layout = (await Layout({ children: null, params: Promise.resolve({ locale }) })) as ReactElement<{
        links: { url: string }[]
      }>
      const prefix = locale === 'zh-hant' ? '' : locale === 'zh' ? '/zh' : '/en'
      for (const [index, guide] of ['deposits', 'withdrawals', 'fees', 'settlement'].entries()) {
        const resolved = getPathname({ locale, href: layout.props.links[index]!.url })
        expect(new URL(resolved, resolveSiteUrl()).pathname).toBe(`${prefix}/learn/${guide}`)
      }
    }
  })
})
