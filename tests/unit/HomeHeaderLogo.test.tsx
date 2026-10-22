import type { ReactNode } from 'react'

import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'

import HeaderLogo from '@/components/HeaderLogo'
import HomeHeaderLogo from '@/components/HomeHeaderLogo'

import { hoisted } from '../bun-test-helpers'

const mocks = hoisted(() => ({ pathname: '/' }))

void mock.module('@/hooks/useSitePresentation', () => ({
  useSitePresentation: () => ({ name: '风向市场', logoSvg: '<svg viewBox="0 0 10 10"/>', logoImageUrl: null }),
}))

void mock.module('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>,
  usePathname: () => mocks.pathname,
}))

describe('homepage brand heading', () => {
  beforeEach(() => {
    mocks.pathname = '/'
  })

  it('gives the homepage one visible primary heading while keeping the footer logo a label', () => {
    const html = renderToStaticMarkup(
      <>
        <HomeHeaderLogo />
        <HeaderLogo />
      </>,
    )
    expect(html.match(/<h1>/g)).toHaveLength(1)
    expect(html).toContain('<h1>风向市场</h1>')
    expect(html).toContain('<span>风向市场</span>')
  })

  it('leaves other pages free to provide their own main heading', () => {
    for (const pathname of ['/new', '/crypto', '/portfolio', '/event/example']) {
      mocks.pathname = pathname
      const html = renderToStaticMarkup(<HomeHeaderLogo />)
      expect(html).not.toContain('<h1>')
      expect(html).toContain('风向市场')
    }
  })
})
