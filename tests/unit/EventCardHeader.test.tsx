import type { AnchorHTMLAttributes } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it, mock } from 'bun:test'

import EventCardHeader from '@/app/[locale]/(platform)/(home)/_components/EventCardHeader'

void mock.module('next-intl', () => ({
  useExtracted: () => (message: string) => message,
  useLocale: () => 'en',
}))

void mock.module('@/i18n/navigation', () => ({
  Link: function MockLink({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

void mock.module('@/components/EventIconImage', () => ({
  default: () => <span data-testid="event-icon" />,
}))

const EVENT = {
  id: 'event-1',
  slug: 'highest-temperature-sao-paulo',
  title: 'Highest temperature in Sao Paulo on June 9?',
  creator: 'Kuest',
  icon_url: null,
  status: 'active',
  markets: [
    {
      condition_id: 'market-1',
      is_resolved: false,
      condition: {
        resolved: false,
      },
    },
  ],
  tags: [],
} as any

describe('eventCardHeader', () => {
  it('uses the live series destination for the BTC card title', () => {
    render(
      <EventCardHeader
        event={
          {
            slug: 'btc-old',
            series_slug: 'btc-up-or-down-15m',
            main_tag: 'Crypto',
            status: 'active',
            markets: [],
          } as any
        }
        title="BTC 15m"
      />,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/event/series/btc-up-or-down-15m')
  })

  it('clamps multi-market event titles to two lines', () => {
    render(<EventCardHeader event={EVENT} title={EVENT.title} />)

    expect(screen.getByRole('heading', { name: EVENT.title })).toHaveClass('line-clamp-2')
  })
})
