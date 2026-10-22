import { useExtracted } from 'next-intl'

import type { Event } from '@/types'

import HomeEventLink from '@/app/[locale]/(platform)/(home)/_components/HomeEventLink'
import EventIconImage from '@/components/EventIconImage'

interface EventCardHeaderProps {
  event: Event
  title: string
}

export default function EventCardHeader({ event, title }: EventCardHeaderProps) {
  const t = useExtracted()

  return (
    <div className="mb-3 flex items-start justify-between">
      <HomeEventLink event={event} title={title} className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex size-10 shrink-0 items-center justify-center self-start rounded-sm">
          <EventIconImage
            src={event.icon_url}
            alt={title || event.creator || t('Market')}
            sizes="40px"
            containerClassName="size-full rounded-sm"
          />
        </div>

        <h3 className="line-clamp-2 w-full text-sm/5 font-semibold underline-offset-2 transition-colors duration-200 hover:text-foreground hover:underline">
          {title}
        </h3>
      </HomeEventLink>
    </div>
  )
}
