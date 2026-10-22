import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, jest, mock } from 'bun:test'

import type { Event as MarketEvent } from '@/types'

import { useHomeSeriesRollover } from '@/hooks/useHomeSeriesRollover'

import { useFakeTimers, useRealTimers } from '../bun-test-helpers'

const boundary = Date.parse('2026-10-22T04:30:00.000Z')
const event = {
  series_slug: 'btc-up-or-down-15m',
  main_tag: 'Crypto',
  end_date: new Date(boundary).toISOString(),
  markets: [{ is_resolved: false }],
} as MarketEvent

describe('home series rollover refresh', () => {
  beforeEach(() => {
    useFakeTimers()
    jest.setSystemTime(boundary - 10_000)
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
  })

  afterEach(() => {
    useRealTimers()
    delete (document as any).visibilityState
  })

  it('refreshes at the period boundary and schedules the next period after new data arrives', () => {
    const refresh = mock().mockResolvedValue(undefined)
    const { rerender, unmount } = renderHook(
      ({ events }) => useHomeSeriesRollover({ events, enabled: true, refresh }),
      {
        initialProps: { events: [event] },
      },
    )
    act(() => jest.advanceTimersByTime(10_000))
    expect(refresh).not.toHaveBeenCalled()
    act(() => jest.advanceTimersByTime(100))
    expect(refresh).toHaveBeenCalledTimes(1)
    rerender({ events: [{ ...event, end_date: new Date(boundary + 15 * 60_000).toISOString() }] })
    act(() => jest.advanceTimersByTime(15 * 60_000))
    expect(refresh).toHaveBeenCalledTimes(2)
    unmount()
  })

  it('catches up when a hidden homepage is reopened after the boundary', () => {
    const refresh = mock().mockResolvedValue(undefined)
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    const { unmount } = renderHook(() => useHomeSeriesRollover({ events: [event], enabled: true, refresh }))
    act(() => jest.advanceTimersByTime(20_000))
    expect(refresh).not.toHaveBeenCalled()
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(refresh).toHaveBeenCalledTimes(1)
    unmount()
  })

  it('does not loop on a stale response while the periodic query retry remains available', () => {
    jest.setSystemTime(boundary + 1_000)
    const refresh = mock().mockResolvedValue(undefined)
    const { unmount } = renderHook(() => useHomeSeriesRollover({ events: [event], enabled: true, refresh }))
    act(() => jest.advanceTimersByTime(60_000))
    expect(refresh).not.toHaveBeenCalled()
    unmount()
  })

  it('cancels refreshes after unmount and leaves resolved listings alone', () => {
    const refresh = mock().mockResolvedValue(undefined)
    const { unmount } = renderHook(() => useHomeSeriesRollover({ events: [event], enabled: true, refresh }))
    unmount()
    const disabled = renderHook(() => useHomeSeriesRollover({ events: [event], enabled: false, refresh }))
    act(() => jest.advanceTimersByTime(20_000))
    expect(refresh).not.toHaveBeenCalled()
    disabled.unmount()
  })
})
