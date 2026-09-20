import { ChevronRightIcon, HeadphonesIcon, SendIcon } from 'lucide-react'

import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

export default function DepositSupport({ locale }: { locale: string }) {
  if (!windmarket.depositSupport.enabled) {
    return null
  }

  const copy = getWindMarketCopy(locale)

  return (
    <a
      href={windmarket.depositSupport.url}
      target="_blank"
      rel="noopener noreferrer"
      data-windmarket-deposit-support
      className="wm-deposit-support group flex min-h-[72px] w-full items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 text-start text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center" aria-hidden="true">
          <span className="wm-support-icon">
            <HeadphonesIcon className="size-5" />
          </span>
        </span>
        <span className="min-w-0">
          <span className="block text-sm leading-5 font-semibold">{copy.depositSupport}</span>
          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{copy.depositSupportDetail}</span>
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2" aria-hidden="true">
        <span className="flex size-6.5 items-center justify-center rounded-full bg-[#229ed9] text-white">
          <SendIcon className="size-4" />
        </span>
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </span>
    </a>
  )
}
