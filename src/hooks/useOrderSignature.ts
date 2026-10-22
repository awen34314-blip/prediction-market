'use client'

import type { Address } from 'viem'

import { useExtracted } from 'next-intl'
import { useConfig } from 'wagmi'
import { getAccount, signTypedData, switchChain } from 'wagmi/actions'

import type { SignOrderArgs } from '@/lib/orders/signing'

import { useSignaturePromptRunner } from '@/hooks/useSignaturePromptRunner'
import { DEFAULT_CHAIN_ID, IS_TEST_MODE } from '@/lib/network'
import { signOrderPayload } from '@/lib/orders/signing'
import { isUserRejectedRequestError, WalletConnectorNotConnectedError } from '@/lib/wallet'

export class OrderNetworkSwitchError extends Error {
  constructor(public readonly reason: 'rejected' | 'failed') {
    super('The wallet must use the trading network before signing an order.')
    this.name = 'OrderNetworkSwitchError'
  }
}

export function useOrderSignature() {
  const config = useConfig()
  const { runWithSignaturePrompt } = useSignaturePromptRunner()
  const t = useExtracted()
  const networkName = IS_TEST_MODE ? 'Polygon Amoy' : 'Polygon'

  async function signOrder({
    payload,
    domain,
    account,
  }: Pick<SignOrderArgs, 'payload' | 'domain'> & { account: Address }) {
    // Read the live connection at submission time, not a previous React render.
    const { connector, status } = getAccount(config)
    if (!connector || status !== 'connected') {
      throw new WalletConnectorNotConnectedError()
    }

    try {
      // The connector's network can differ from Wagmi's cached chain ID.
      if ((await connector.getChainId()) !== DEFAULT_CHAIN_ID) {
        await runWithSignaturePrompt(() => switchChain(config, { chainId: DEFAULT_CHAIN_ID, connector }), {
          title: t('Switch to {network}', { network: networkName }),
          description: t('Open your wallet and approve the switch to {network} to continue.', { network: networkName }),
        })

        if ((await connector.getChainId()) !== DEFAULT_CHAIN_ID) {
          throw new OrderNetworkSwitchError('failed')
        }
      }
    } catch (error) {
      const rejected =
        isUserRejectedRequestError(error) ||
        (typeof error === 'object' && error !== null && 'code' in error && error.code === 4001)
      throw new OrderNetworkSwitchError(rejected ? 'rejected' : 'failed')
    }

    return runWithSignaturePrompt(() =>
      signOrderPayload({
        payload,
        domain,
        // Pin signing to the same wallet we just checked, even if the active connection changes.
        signTypedDataAsync: (parameters) => signTypedData(config, { ...parameters, account, connector }),
      }),
    )
  }

  return { signOrder, networkName }
}
