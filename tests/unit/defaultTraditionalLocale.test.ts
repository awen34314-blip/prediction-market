import { parse } from '@formatjs/icu-messageformat-parser'
import { describe, expect, it } from 'bun:test'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

import { DEFAULT_LOCALE, SOURCE_LOCALE, NON_DEFAULT_LOCALES, normalizeEnabledLocales } from '@/i18n/locales'
import traditional from '@/i18n/messages/zh-hant.json'
import simplified from '@/i18n/messages/zh.json'
import { routing } from '@/i18n/routing'
import { translateAppKitText } from '@/lib/appkit-i18n/translate'
import { withLocalePrefix } from '@/lib/locale-path'
import { localizeChineseText, marketTranslationLocales } from '@/lib/traditional-chinese'

describe('Traditional Chinese default entry', () => {
  it('keeps English as the source language and enables the display default', () => {
    expect(DEFAULT_LOCALE).toBe('zh-hant')
    expect(SOURCE_LOCALE).toBe('en')
    expect(NON_DEFAULT_LOCALES).not.toContain('en')
    expect(NON_DEFAULT_LOCALES).toContain('zh')
    expect(normalizeEnabledLocales(['en', 'zh'])).toEqual(['zh-hant', 'en', 'zh'])
  })

  it('routes fresh visits to Traditional Chinese regardless of browser language', () => {
    const middleware = createMiddleware(routing)
    for (const language of ['en-US', 'zh-CN']) {
      const response = middleware(
        new NextRequest('https://app.windmarket.top/?utm_source=test', {
          headers: { 'accept-language': language },
        }),
      )
      expect(response.headers.get('x-middleware-rewrite')).toContain('/zh-hant?utm_source=test')
    }
    for (const locale of ['en', 'zh']) {
      const response = middleware(new NextRequest(`https://app.windmarket.top/${locale}`))
      expect(response.headers.get('location')).toBeNull()
    }
    const oldLink = middleware(new NextRequest('https://app.windmarket.top/zh-hant?utm_source=test'))
    expect(oldLink.headers.get('location')).toBe('https://app.windmarket.top/?utm_source=test')
    expect(withLocalePrefix('/portfolio', 'en')).toBe('/en/portfolio')
    expect(withLocalePrefix('/portfolio', 'zh-hant')).toBe('/portfolio')
  })

  it('preserves translation keys and ICU placeholders', () => {
    // Admin template examples use literal double braces, outside ICU syntax.
    function templateTokens(text: string) {
      return text.match(/\{\{[^{}]+\}\}/g) ?? []
    }
    function structure(text: string) {
      return JSON.parse(
        JSON.stringify(parse(text.replace(/\{\{[^{}]+\}\}/g, 'TEMPLATE')), (_key, value) =>
          value && value.type === 0 ? { type: 0 } : value,
        ),
      )
    }
    function check(source: unknown, target: unknown) {
      if (typeof source === 'string') {
        expect(typeof target).toBe('string')
        expect(templateTokens(String(target))).toEqual(templateTokens(source))
        expect(structure(String(target))).toEqual(structure(source))
      } else if (source && typeof source === 'object') {
        expect(Object.keys(target as object)).toEqual(Object.keys(source))
        for (const [key, value] of Object.entries(source)) {
          check(value, (target as Record<string, unknown>)[key])
        }
      }
    }
    check(simplified, traditional)
    expect(translateAppKitText('Connect Wallet', 'zh-hant')).toBe('登錄風向市場')
    expect(marketTranslationLocales('zh-hant')).toEqual(['zh', 'zh-hant'])
    expect(localizeChineseText('预测市场交易 0x123 https://example.com', 'zh-hant')).toBe(
      '預測市場交易 0x123 https://example.com',
    )
  })
})
