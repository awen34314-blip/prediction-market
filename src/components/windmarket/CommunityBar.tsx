import { ArrowUpRightIcon, SendIcon } from 'lucide-react'

import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

export default function CommunityBar({ locale }: { locale: string }) {
  if (!windmarket.community.enabled) {
    return null
  }

  const copy = getWindMarketCopy(locale)

  return (
    <aside className="wm-community-bar" aria-label={copy.community} data-windmarket-community>
      <div className="wm-bar-inner container">
        <span className="wm-bar-icon" aria-hidden="true">
          <SendIcon size={18} strokeWidth={1.7} />
        </span>
        <div className="wm-bar-copy">
          <span className="wm-bar-label">{copy.community}</span>
          <span className="wm-bar-detail">{copy.communityDetail}</span>
        </div>
        <a
          className="wm-bar-cta"
          href={windmarket.community.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.join} · Telegram`}
        >
          <span>{copy.join}</span>
          <ArrowUpRightIcon size={14} aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}
