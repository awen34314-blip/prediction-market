import { CheckIcon, XIcon } from 'lucide-react'
import { useExtracted } from 'next-intl'

import type { HomeCardBinaryOutcome } from '@/app/[locale]/(platform)/(home)/_utils/homeCardMarketDisplay'
import type { Event, Market } from '@/types'

import HomeEventLink from '@/app/[locale]/(platform)/(home)/_components/HomeEventLink'
import { resolveBinaryOutcomeByIndex } from '@/app/[locale]/(platform)/(home)/_utils/eventCardResolvedOutcome'
import { Button } from '@/components/ui/button'
import { useOutcomeLabel } from '@/hooks/useOutcomeLabel'
import { OUTCOME_INDEX } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface EventCardSingleMarketActionsProps {
  event: Event
  yesOutcome: HomeCardBinaryOutcome
  noOutcome: HomeCardBinaryOutcome
  primaryMarket: Market | undefined
  isResolvedEvent: boolean
  resolvedOutcomeIndexByConditionId: Partial<Record<string, typeof OUTCOME_INDEX.YES | typeof OUTCOME_INDEX.NO>>
}

export default function EventCardSingleMarketActions({
  event,
  yesOutcome,
  noOutcome,
  primaryMarket,
  isResolvedEvent,
  resolvedOutcomeIndexByConditionId,
}: EventCardSingleMarketActionsProps) {
  const t = useExtracted()
  const normalizeOutcomeLabel = useOutcomeLabel()
  if (!primaryMarket) {
    return null
  }

  if (isResolvedEvent) {
    const resolvedOutcomeIndex = resolvedOutcomeIndexByConditionId[primaryMarket.condition_id] ?? null
    const resolvedOutcome = resolveBinaryOutcomeByIndex(primaryMarket, resolvedOutcomeIndex)
    const resolvedLabel = normalizeOutcomeLabel(resolvedOutcome?.outcome_text) ?? resolvedOutcome?.outcome_text
    const isYesOutcome = resolvedOutcomeIndex === OUTCOME_INDEX.YES

    return (
      <div className="mt-auto mb-0">
        {resolvedOutcome ? (
          <div
            className={cn(
              `flex h-12 w-full cursor-default items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold text-foreground transition-colors dark:border-none dark:bg-secondary dark:group-hover:bg-card`,
            )}
          >
            <span
              className={cn(
                `flex size-4 items-center justify-center rounded-full ${isYesOutcome ? 'bg-yes' : `bg-no`}`,
              )}
            >
              {isYesOutcome ? (
                <CheckIcon className="size-3 text-background" strokeWidth={2.5} />
              ) : (
                <XIcon className="size-3 text-background" strokeWidth={2.5} />
              )}
            </span>
            <span className="min-w-8 text-left">{resolvedLabel}</span>
          </div>
        ) : (
          <div
            className={cn(
              `flex h-10 w-full cursor-default items-center justify-center rounded-md px-3 text-sm font-semibold text-muted-foreground transition-colors dark:group-hover:bg-card`,
            )}
          >
            {t('Resolved')}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-auto mb-2 grid grid-cols-2 gap-2">
      <Button
        variant="yes"
        size="outcome"
        nativeButton={false}
        render={
          <HomeEventLink event={event} outcomeIndex={yesOutcome.outcome_index} conditionId={primaryMarket.condition_id}>
            <span className="truncate">
              {normalizeOutcomeLabel(yesOutcome.outcome_text) ?? yesOutcome.outcome_text}
            </span>
          </HomeEventLink>
        }
      />
      <Button
        variant="no"
        size="outcome"
        nativeButton={false}
        render={
          <HomeEventLink event={event} outcomeIndex={noOutcome.outcome_index} conditionId={primaryMarket.condition_id}>
            <span className="truncate">{normalizeOutcomeLabel(noOutcome.outcome_text) ?? noOutcome.outcome_text}</span>
          </HomeEventLink>
        }
      />
    </div>
  )
}
