import { render, screen } from '@testing-library/react'
import { describe, expect, it, mock } from 'bun:test'

import type { Event, Market } from '@/types'

import EventCardSingleMarketActions from '@/app/[locale]/(platform)/(home)/_components/EventCardSingleMarketActions'

void mock.module('next-intl', () => ({
  useLocale: () => 'zh-hant',
  useExtracted: () => (message: string) => message,
}))

const market = {
  condition_id: 'sol-condition',
  outcomes: [
    { outcome_index: 1, outcome_text: 'Down' },
    { outcome_index: 0, outcome_text: 'Up' },
  ],
  is_resolved: false,
  condition: { resolved: false },
} as Market
const event = {
  slug: 'sol-updown-4h-old',
  status: 'active',
  series_slug: 'sol-up-or-down-4h',
  series_recurrence: '4h',
  main_tag: 'Crypto',
  markets: [market],
} as Event
const props = {
  event,
  primaryMarket: market,
  yesOutcome: { outcome_index: 0, outcome_text: 'Up' },
  noOutcome: { outcome_index: 1, outcome_text: 'Down' },
  isResolvedEvent: false,
  resolvedOutcomeIndexByConditionId: {},
}

describe('single market card probabilities', () => {
  it.each([
    [32, 32, 68],
    [42, 42, 58],
    [92, 92, 8],
    [50, 50, 50],
    [0, 0, 100],
    [100, 100, 0],
    [32.5, 33, 67],
  ])('keeps a %s percent YES chance attached to Up and complements Down', (chance, up, down) => {
    render(<EventCardSingleMarketActions {...props} yesChance={chance} />)

    expect(screen.getByRole('group', { name: 'chance' })).toBeInTheDocument()
    const upButton = screen.getByRole('button', { name: `Up ${up}%` })
    const downButton = screen.getByRole('button', { name: `Down ${down}%` })
    expect(upButton).toHaveAttribute('href', expect.stringContaining('outcomeIndex=0'))
    expect(downButton).toHaveAttribute('href', expect.stringContaining('outcomeIndex=1'))
  })

  it.each([null, Number.NaN, Number.POSITIVE_INFINITY])(
    'shows an unavailable value for both sides when chance is %s',
    (chance) => {
      render(<EventCardSingleMarketActions {...props} yesChance={chance} />)

      expect(screen.getByRole('button', { name: 'Up —' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Down —' })).toBeInTheDocument()
      expect(screen.queryByText(/%/)).not.toBeInTheDocument()
    },
  )

  it('updates both percentages together when the live quote changes sides', () => {
    const { rerender } = render(<EventCardSingleMarketActions {...props} yesChance={32} />)
    rerender(<EventCardSingleMarketActions {...props} yesChance={92} />)

    expect(screen.getByRole('button', { name: 'Up 92%' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Down 8%' })).toBeInTheDocument()
    expect(screen.queryByText('32%')).not.toBeInTheDocument()
    expect(screen.queryByText('68%')).not.toBeInTheDocument()
  })

  it('keeps the resolved winner in place of probabilities and trading buttons', () => {
    render(
      <EventCardSingleMarketActions
        {...props}
        yesChance={32}
        isResolvedEvent
        resolvedOutcomeIndexByConditionId={{ 'sol-condition': 1 }}
      />,
    )

    expect(screen.getByText('Down')).toBeInTheDocument()
    expect(screen.queryByRole('group', { name: 'chance' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
