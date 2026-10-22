'use client'

import { useEffect } from 'react'

import type { Event } from '@/types'

import { isIntradayCryptoEvent } from '@/lib/crypto-cadence-event'
import { isEventResolvedLike } from '@/lib/home-events'

export function useHomeSeriesRollover({
  events,
  enabled,
  refresh,
}: {
  events: Event[]
  enabled: boolean
  refresh: () => Promise<unknown>
}) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const endTimes = events
      .filter((event) => isIntradayCryptoEvent(event) && !isEventResolvedLike(event))
      .map((event) => Date.parse(event.end_date ?? ''))
      .filter(Number.isFinite)
    if (endTimes.length === 0) {
      return
    }

    function refreshVisibleExpiredSeries() {
      if (document.visibilityState !== 'hidden' && endTimes.some((time) => time <= Date.now())) {
        void refresh().catch(() => undefined)
      }
    }

    const now = Date.now()
    const nextEndTime = Math.min(...endTimes.filter((time) => time > now))
    const timeout = Number.isFinite(nextEndTime)
      ? window.setTimeout(refreshVisibleExpiredSeries, nextEndTime - now + 100)
      : null
    document.addEventListener('visibilitychange', refreshVisibleExpiredSeries)

    return () => {
      if (timeout !== null) {
        window.clearTimeout(timeout)
      }
      document.removeEventListener('visibilitychange', refreshVisibleExpiredSeries)
    }
  }, [enabled, events, refresh])
}
