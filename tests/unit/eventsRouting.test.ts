import { describe, expect, it } from 'bun:test'

import { resolveEventCanonicalPath, resolveEventMarketPath, resolveEventPagePath } from '@/lib/events-routing'

describe('events routing', () => {
  it('uses the event as canonical for the repeated slug of a single-market event', () => {
    const event = { slug: 'btc-updown-15m-1792280700', total_markets_count: 1 }

    expect(resolveEventCanonicalPath(event)).toBe('/event/btc-updown-15m-1792280700')
    expect(resolveEventCanonicalPath(event, event.slug)).toBe('/event/btc-updown-15m-1792280700')
    expect(resolveEventMarketPath(event, event.slug)).toBe('/event/btc-updown-15m-1792280700/btc-updown-15m-1792280700')
  })

  it('preserves distinct markets and does not guess when the market count is unknown', () => {
    expect(resolveEventCanonicalPath({ slug: 'election', total_markets_count: 2 }, 'election')).toBe(
      '/event/election/election',
    )
    expect(resolveEventCanonicalPath({ slug: 'election', total_markets_count: 1 }, 'popular-vote')).toBe(
      '/event/election/popular-vote',
    )
    expect(resolveEventCanonicalPath({ slug: 'election' }, 'election')).toBe('/event/election/election')
    expect(resolveEventCanonicalPath({ slug: 'election', total_markets_count: 0 }, 'election')).toBe(
      '/event/election/election',
    )
  })

  it('opens the exact market for regular, multi-market and NegRisk event pages', () => {
    const event = { slug: 'presidential-election' }

    expect(resolveEventMarketPath(event, 'winner')).toBe('/event/presidential-election/winner')
    expect(resolveEventMarketPath(event, 'popular-vote')).toBe('/event/presidential-election/popular-vote')
    expect(resolveEventMarketPath(event, 'democratic-nominee')).toBe('/event/presidential-election/democratic-nominee')
  })

  it('keeps sports games on sports routes', () => {
    const event = {
      slug: 'lakers-celtics-2026-03-09',
      sports_event_slug: 'lakers-celtics-2026-03-09',
      sports_sport_slug: 'nba',
      sports_section: 'games' as const,
    }

    expect(resolveEventPagePath(event)).toBe('/sports/nba/lakers-celtics-2026-03-09')
    expect(resolveEventMarketPath(event, 'moneyline')).toBe('/sports/nba/lakers-celtics-2026-03-09/moneyline')
  })

  it('routes esports games through esports paths when tagged accordingly', () => {
    const event = {
      slug: 'team-spirit-vs-faze-2026-03-09',
      sports_event_slug: 'team-spirit-vs-faze-2026-03-09',
      sports_sport_slug: 'counter-strike',
      sports_section: 'games' as const,
      tags: [{ slug: 'esports' }],
    }

    expect(resolveEventPagePath(event)).toBe('/esports/counter-strike/team-spirit-vs-faze-2026-03-09')
    expect(resolveEventMarketPath(event, 'match-winner')).toBe(
      '/esports/counter-strike/team-spirit-vs-faze-2026-03-09/match-winner',
    )
  })

  it('routes esports league events through nested league paths when available', () => {
    const event = {
      slug: 'dota2-vg-yb1-2026-04-03',
      sports_event_slug: 'dota2-vg-yb1-2026-04-03',
      sports_sport_slug: 'dota-2',
      sports_league_slug: 'blast-slam',
      sports_section: 'games' as const,
      tags: [{ slug: 'esports' }],
    }

    expect(resolveEventPagePath(event)).toBe('/esports/dota-2/blast-slam/dota2-vg-yb1-2026-04-03')
    expect(resolveEventMarketPath(event, 'game-1-winner')).toBe(
      '/esports/dota-2/blast-slam/dota2-vg-yb1-2026-04-03/game-1-winner',
    )
  })

  it('routes sports props through standard event pages', () => {
    const event = {
      slug: 'lebron-james-points-2026-03-09',
      sports_event_slug: 'lakers-celtics-2026-03-09',
      sports_sport_slug: 'nba',
      sports_section: 'props' as const,
    }

    expect(resolveEventPagePath(event)).toBe('/event/lebron-james-points-2026-03-09')
    expect(resolveEventMarketPath(event, 'over-27pt5')).toBe('/event/lebron-james-points-2026-03-09/over-27pt5')
  })

  it('infers props routing from tags when explicit sports section is absent', () => {
    const event = {
      slug: 'lebron-james-points-2026-03-09',
      sports_event_slug: 'lakers-celtics-2026-03-09',
      sports_sport_slug: 'nba',
      tags: [{ slug: 'sports' }, { slug: 'props' }],
    }

    expect(resolveEventPagePath(event)).toBe('/event/lebron-james-points-2026-03-09')
  })
})
