'use client'

import type { ComponentProps } from 'react'

import { useLocale } from 'next-intl'
import { forwardRef } from 'react'

import type { Event } from '@/types'

import IntentPrefetchLink from '@/app/[locale]/(platform)/_components/IntentPrefetchLink'
import { isIntradayCryptoEvent } from '@/lib/crypto-cadence-event'
import { resolveEventOutcomePath, resolveEventPagePath } from '@/lib/events-routing'
import { isEventResolvedLike } from '@/lib/home-events'

interface HomeEventLinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  event: Event
  outcomeIndex?: number
  conditionId?: string
}

const HomeEventLink = forwardRef<HTMLAnchorElement, HomeEventLinkProps>(function HomeEventLink(
  { event, outcomeIndex, conditionId, ...props },
  ref,
) {
  const locale = useLocale()
  const seriesSlug = event.series_slug?.trim()
  if (seriesSlug && event.status === 'active' && isIntradayCryptoEvent(event) && !isEventResolvedLike(event)) {
    const params = new URLSearchParams({ seriesSlug, locale })
    if (outcomeIndex !== undefined) {
      params.set('outcomeIndex', String(outcomeIndex))
      if (conditionId) {
        params.set('conditionId', conditionId)
      }
    }

    // Resolve at click time. Prefetching a redirect could freeze the previous period.
    return <a {...props} href={`/api/home-featured/live-link?${params}`} ref={ref} />
  }

  const href =
    outcomeIndex === undefined ? resolveEventPagePath(event) : resolveEventOutcomePath(event, { outcomeIndex })
  return <IntentPrefetchLink {...props} href={href} ref={ref} />
})

export default HomeEventLink
