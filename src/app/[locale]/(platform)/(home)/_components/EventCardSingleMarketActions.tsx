import { CheckIcon, XIcon } from 'lucide-react'
import { useExtracted } from 'next-intl'

import type { HomeCardBinaryOutcome } from '@/app/[locale]/(platform)/(home)/_utils/homeCardMarketDisplay'
import type { Event, Market } from '@/types'

import HomeEventLink from '@/app/[locale]/(platform)/(home)/_components/HomeEventLink'
import { resolveBinaryOutcomeByIndex } from '@/app/[locale]/(platform)/(home)/_utils/eventCardResolvedOutcome'
import { formatHomeCardChanceLabel } from '@/app/[locale]/(platform)/(home)/_utils/homeCardMarketDisplay'
import { Button } from '@/components/ui/button'
import { useOutcomeLabel } from '@/hooks/useOutcomeLabel'
import { OUTCOME_INDEX } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface EventCardSingleMarketActionsProps {
  event: Event
  yesOutcome: HomeCardBinaryOutcome
  noOutcome: HomeCardBinaryOutcome
  primaryMarket: Market | undefined
  yesChance: number | null
  isResolvedEvent: boolean
  resolvedOutcomeIndexByConditionId: Partial<Record<string, typeof OUTCOME_INDEX.YES | typeof OUTCOME_INDEX.NO>>
}

export default function EventCardSingleMarketActions({
  event,
  yesOutcome,
  noOutcome,
  primaryMarket,
  yesChance,
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

  const roundedYesChance =
    yesChance == null || !Number.isFinite(yesChance) ? null : Math.round(Math.min(100, Math.max(0, yesChance)))
  const roundedNoChance = roundedYesChance == null ? null : 100 - roundedYesChance

  return (
    <div role="group" aria-label={t('chance')} className="mt-auto mb-2">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="shrink-0 text-xs text-muted-foreground">{t('chance')}</span>
        <div aria-hidden="true" className="flex h-1 flex-1 overflow-hidden rounded-full bg-muted">
          {roundedYesChance != null && (
            <>
              <span
                className="h-full bg-yes transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${roundedYesChance}%` }}
              />
              <span
                className="h-full bg-no transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${roundedNoChance}%` }}
              />
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="yes"
          size="outcome"
          className="justify-between gap-2 text-emerald-700 dark:text-yes"
          nativeButton={false}
          render={
            <HomeEventLink
              event={event}
              outcomeIndex={yesOutcome.outcome_index}
              conditionId={primaryMarket.condition_id}
            >
              <span className="truncate">
                {normalizeOutcomeLabel(yesOutcome.outcome_text) ?? yesOutcome.outcome_text}
              </span>
              <span className="shrink-0 text-lg font-bold tabular-nums">
                {formatHomeCardChanceLabel(roundedYesChance)}
              </span>
            </HomeEventLink>
          }
        />
        <Button
          variant="no"
          size="outcome"
          className="justify-between gap-2 text-rose-700 dark:text-no"
          nativeButton={false}
          render={
            <HomeEventLink
              event={event}
              outcomeIndex={noOutcome.outcome_index}
              conditionId={primaryMarket.condition_id}
            >
              <span className="truncate">
                {normalizeOutcomeLabel(noOutcome.outcome_text) ?? noOutcome.outcome_text}
              </span>
              <span className="shrink-0 text-lg font-bold tabular-nums">
                {formatHomeCardChanceLabel(roundedNoChance)}
              </span>
            </HomeEventLink>
          }
        />
      </div>
    </div>
  )
}
