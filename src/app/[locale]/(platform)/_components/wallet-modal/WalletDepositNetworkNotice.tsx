'use client'

import { BanIcon, TriangleAlertIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'

import { IS_TEST_MODE } from '@/lib/network'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

export default function WalletDepositNetworkNotice() {
  const locale = useLocale()
  const copy = getWindMarketCopy(locale).directDepositNotice

  return (
    <aside
      data-deposit-network-notice
      aria-label={IS_TEST_MODE ? copy.testTitle : copy.title}
      className="space-y-3 rounded-xl border-2 border-amber-500/50 bg-amber-50 p-3 text-start dark:bg-amber-400/5"
    >
      <div className="flex items-start gap-2 text-amber-950 dark:text-amber-100">
        <TriangleAlertIcon className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
        <h3 className="text-base leading-6 font-bold">{IS_TEST_MODE ? copy.testTitle : copy.title}</h3>
      </div>

      <dl className="grid grid-cols-2 gap-2">
        {[
          { label: copy.tokenLabel, value: 'USDC', icon: 'usdc' },
          { label: copy.networkLabel, value: IS_TEST_MODE ? 'Amoy' : 'Polygon', icon: 'polygon' },
        ].map(({ label, value, icon }) => (
          <div key={icon} className="min-w-0 rounded-lg border border-border bg-background px-3 py-2.5">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-1 flex items-center gap-2 text-base font-bold text-foreground">
              <Image
                src={`/images/deposit/transfer/${icon}_dark.png`}
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0"
              />
              <span dir="ltr">{value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-start gap-2 text-sm leading-5 text-amber-950 dark:text-amber-100">
        <BanIcon className="mt-0.5 size-4 shrink-0 text-red-700 dark:text-red-400" aria-hidden="true" />
        <div className="min-w-0 space-y-1">
          <p className="font-semibold">{IS_TEST_MODE ? copy.testWarning : copy.networkWarning}</p>
          {!IS_TEST_MODE && <p className="text-xs leading-5">{copy.assetWarning}</p>}
        </div>
      </div>
    </aside>
  )
}
