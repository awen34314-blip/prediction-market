'use client'

import { useExtracted } from 'next-intl'
import QRCode from 'react-qr-code'

import WalletAddressCard from '@/app/[locale]/(platform)/_components/wallet-modal/WalletAddressCard'
import WalletDepositNetworkNotice from '@/app/[locale]/(platform)/_components/wallet-modal/WalletDepositNetworkNotice'
import { useSiteIdentity } from '@/hooks/useSiteIdentity'

function WalletReceiveView({
  walletAddress,
  siteName,
  onCopy,
  copied,
}: {
  walletAddress?: string | null
  siteName?: string
  onCopy: () => void
  copied: boolean
}) {
  const site = useSiteIdentity()
  const siteLabel = siteName ?? site.name
  const t = useExtracted()

  return (
    <div className="space-y-4">
      <WalletDepositNetworkNotice />
      <div className="space-y-2">
        <p className="text-center text-sm font-semibold text-muted-foreground">
          <span>{t('Scan QR Code or copy your {siteName} wallet address to transfer', { siteName: siteLabel })}</span>{' '}
          <span>USDC</span>
        </p>
        <div className="flex justify-center">
          <div className="rounded-lg border bg-white p-2 transition">
            {walletAddress ? (
              <QRCode value={walletAddress} size={200} />
            ) : (
              <p className="text-sm">{t('Deposit Wallet not ready yet.')}</p>
            )}
          </div>
        </div>
      </div>
      <WalletAddressCard walletAddress={walletAddress} onCopy={onCopy} copied={copied} label={t('Deposit Wallet')} />
    </div>
  )
}

export default WalletReceiveView
