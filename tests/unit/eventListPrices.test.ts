import { afterEach, describe, expect, it, mock } from 'bun:test'
import * as actualNextCache from 'next/cache'

import type { Event } from '@/types'

import { stubGlobal, unstubAllGlobals } from '../bun-test-helpers'

mock.module('next/cache', () => ({ ...actualNextCache, cacheLife: mock(), cacheTag: mock() }))

const { hydrateEventListPrices } = await import('@/lib/db/queries/event')

function eventWithTokens(id: string, tokens: string[]): Event {
  return {
    id,
    title: id,
    is_bookmarked: true,
    markets: [{ condition_id: id, outcomes: tokens.map((token_id, outcome_index) => ({ token_id, outcome_index })) }],
  } as Event
}

describe('pricing the final home event page', () => {
  afterEach(() => {
    unstubAllGlobals()
  })

  it('keeps quotes, last trades and inverse-outcome prices on the selected events', async () => {
    const fetchMock = mock((url: string) =>
      Promise.resolve(
        url.endsWith('/last-trades-prices')
          ? Response.json([{ token_id: 'last-yes', price: '0.73', side: 'BUY' }])
          : Response.json({
              'quoted-yes': { BUY: '0.64', SELL: '0.60' },
              'quoted-no': { BUY: '0.40', SELL: '0.36' },
              'inverse-no': { BUY: '0.40', SELL: '0.40' },
            }),
      ),
    )
    stubGlobal('fetch', fetchMock)
    const events = [
      eventWithTokens('quoted', ['quoted-yes', 'quoted-no']),
      eventWithTokens('last', ['last-yes']),
      eventWithTokens('inverse', ['inverse-yes', 'inverse-no']),
    ]

    const result = await hydrateEventListPrices(events)

    expect(result.map((event) => event.id)).toEqual(['quoted', 'last', 'inverse'])
    expect(result[0].is_bookmarked).toBe(true)
    expect(result[0].markets[0].price).toBeCloseTo(0.62)
    expect(result[0].markets[0].probability).toBeCloseTo(62)
    expect(result[0].markets[0].outcomes[0].buy_price).toBe(0.64)
    expect(result[1].markets[0].price).toBe(0.73)
    expect(result[1].markets[0].outcomes[0].last_trade_price).toBe(0.73)
    expect(result[2].markets[0].price).toBe(0.6)
    expect(events[0].markets[0].outcomes[0].buy_price).toBeUndefined()
  })

  it('does not request prices for an empty page', async () => {
    const fetchMock = mock()
    stubGlobal('fetch', fetchMock)
    expect(await hydrateEventListPrices([])).toEqual([])
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
