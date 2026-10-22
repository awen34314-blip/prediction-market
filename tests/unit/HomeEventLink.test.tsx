import type { AnchorHTMLAttributes } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it, mock } from 'bun:test'

import type { Event } from '@/types'

import EventCardSingleMarketActions from '@/app/[locale]/(platform)/(home)/_components/EventCardSingleMarketActions'
import HomeEventLink from '@/app/[locale]/(platform)/(home)/_components/HomeEventLink'

void mock.module('next-intl', () => ({
  useLocale: () => 'zh-hant',
  useExtracted: () => (message: string) => message,
}))
void mock.module('@/i18n/navigation', () => ({
  Link: ({ prefetch: _prefetch, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: unknown }) => (
    <a {...props} data-next-link />
  ),
}))

const event = {
  slug: 'btc-updown-15m-1792642500',
  status: 'active',
  series_slug: 'btc-up-or-down-15m',
  series_recurrence: '15m',
  main_tag: 'Crypto',
  markets: [{ is_resolved: false, condition: { resolved: false } }],
} as Event

describe('home event links', () => {
  it('resolves an old crypto card at click time without Next link prefetching', () => {
    render(<HomeEventLink event={event}>BTC 15m</HomeEventLink>)
    const link = screen.getByRole('link', { name: 'BTC 15m' })
    const href = new URL(link.getAttribute('href')!, 'https://app.windmarket.top')
    expect(href.pathname).toBe('/event/series/btc-up-or-down-15m')
    expect(link).not.toHaveAttribute('data-next-link')
  })

  it.each([0, 1])('keeps outcome %s and identifies the old market for safe remapping', (outcomeIndex) => {
    render(
      <HomeEventLink event={event} outcomeIndex={outcomeIndex} conditionId="old-condition">
        Trade
      </HomeEventLink>,
    )
    const link = screen.getByRole('link', { name: 'Trade' })
    const href = new URL(link.getAttribute('href')!, 'https://app.windmarket.top')
    expect(href.searchParams.get('outcomeIndex')).toBe(String(outcomeIndex))
    expect(href.searchParams.get('conditionId')).toBe('old-condition')
    expect(link).not.toHaveAttribute('data-next-link')
  })

  it('uses the live destination for both actual card outcome buttons', () => {
    render(
      <EventCardSingleMarketActions
        event={event}
        primaryMarket={{ ...event.markets[0], condition_id: 'old-condition' }}
        yesOutcome={{ outcome_index: 0, outcome_text: 'Up' }}
        noOutcome={{ outcome_index: 1, outcome_text: 'Down' }}
        isResolvedEvent={false}
        resolvedOutcomeIndexByConditionId={{}}
      />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    for (const [outcomeIndex, button] of buttons.entries()) {
      const href = new URL(button.getAttribute('href')!, 'https://app.windmarket.top')
      expect(href.pathname).toBe('/event/series/btc-up-or-down-15m')
      expect(href.searchParams.get('outcomeIndex')).toBe(String(outcomeIndex))
      expect(href.searchParams.get('conditionId')).toBe('old-condition')
    }
  })

  it.each([
    { status: 'resolved' },
    { markets: [{ is_resolved: true, condition: { resolved: true } }] },
    { series_slug: 'btc-daily', series_recurrence: 'daily' },
    { main_tag: 'Weather' },
    { series_slug: null },
  ])('keeps historical and non-intraday cards on their original event: %j', (overrides) => {
    render(
      <HomeEventLink event={{ ...event, ...overrides } as Event} outcomeIndex={1}>
        View
      </HomeEventLink>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', `/event/${event.slug}?outcomeIndex=1`)
    expect(screen.getByRole('link')).toHaveAttribute('data-next-link')
  })
})
