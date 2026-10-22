import type { CreateConnectorFn } from '@wagmi/core'
import type { ReactNode } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createConfig, createConnector } from '@wagmi/core'
import { afterEach, describe, expect, it, mock } from 'bun:test'
import { http, UserRejectedRequestError } from 'viem'
import { mainnet, polygon, polygonAmoy } from 'viem/chains'
import { WagmiContext } from 'wagmi'

import type { BlockchainOrder } from '@/types'

import { OrderNetworkSwitchError, useOrderSignature } from '@/hooks/useOrderSignature'
import { getExchangeEip712Domain } from '@/lib/constants'
import { ZERO_BYTES32 } from '@/lib/contracts'
import { DEFAULT_CHAIN_ID } from '@/lib/network'
import { useSignaturePrompt } from '@/stores/useSignaturePrompt'

const owner = '0x0000000000000000000000000000000000000001'
const depositWallet = '0x0000000000000000000000000000000000000002'
const payload: BlockchainOrder = {
  salt: 1n,
  maker: depositWallet,
  signer: depositWallet,
  taker: '0x0000000000000000000000000000000000000000',
  token_id: 1n,
  maker_amount: 5000000n,
  taker_amount: 10000000n,
  expiration: 0n,
  nonce: 0n,
  fee_rate_bps: 0n,
  side: 0,
  signature_type: 3,
  timestamp: 1700000000000n,
  metadata: ZERO_BYTES32,
  builder: ZERO_BYTES32,
}

function setup(initialChainId = mainnet.id as number) {
  let liveChainId = initialChainId
  const events: string[] = []
  const request = mock(async ({ method, params }: { method: string; params: string[] }) => {
    if (method !== 'eth_signTypedData_v4') {
      throw new Error(`Unexpected wallet request: ${method}`)
    }
    const data = JSON.parse(params[1])
    expect(Number(data.domain.chainId)).toBe(liveChainId)
    events.push('sign')
    return `0x${'11'.repeat(65)}`
  })
  const switchNetwork = mock(async ({ chainId }: { chainId: number }) => {
    events.push('switch')
    liveChainId = chainId
    return chainId === polygon.id ? polygon : polygonAmoy
  })
  const wallet = createConnector(() => ({
    id: 'order-test-wallet',
    name: 'Order Test Wallet',
    type: 'test',
    connect: (async () => ({ accounts: [owner], chainId: liveChainId })) as CreateConnectorFn['connect'],
    async disconnect() {},
    async getAccounts() {
      return [owner] as const
    },
    async getChainId() {
      events.push(`chain:${liveChainId}`)
      return liveChainId
    },
    async getProvider() {
      return { request }
    },
    async isAuthorized() {
      return true
    },
    switchChain: switchNetwork,
    onAccountsChanged() {},
    onChainChanged() {},
    onDisconnect() {},
  }))
  const config = createConfig({
    chains: [polygon, polygonAmoy, mainnet],
    connectors: [wallet],
    multiInjectedProviderDiscovery: false,
    ssr: true,
    storage: null,
    transports: {
      [polygon.id]: http('https://rpc.invalid'),
      [polygonAmoy.id]: http('https://rpc.invalid'),
      [mainnet.id]: http('https://rpc.invalid'),
    },
  })
  const connector = config.connectors[0]
  config.setState((state) => ({
    ...state,
    status: 'connected',
    current: connector.uid,
    connections: new Map([[connector.uid, { accounts: [owner], chainId: initialChainId, connector }]]),
  }))
  function Wrapper({ children }: { children: ReactNode }) {
    return <WagmiContext.Provider value={config}>{children}</WagmiContext.Provider>
  }
  const { result } = renderHook(() => useOrderSignature(), { wrapper: Wrapper })
  function sign() {
    return result.current.signOrder({ payload, domain: getExchangeEip712Domain(), account: owner })
  }
  return {
    sign,
    result,
    request,
    switchNetwork,
    events,
    config,
    connector,
    setLiveChainId: (id: number) => {
      liveChainId = id
    },
  }
}

afterEach(() => useSignaturePrompt.getState().forceHidePrompt())

describe('order signing on the trading network', () => {
  it('switches from Ethereum, verifies the actual wallet network, then requests the order signature', async () => {
    const wallet = setup()
    await act(async () => {
      expect(await wallet.sign()).toMatch(/^0x/)
    })
    expect(wallet.switchNetwork).toHaveBeenCalledTimes(1)
    expect(wallet.switchNetwork).toHaveBeenCalledWith(expect.objectContaining({ chainId: DEFAULT_CHAIN_ID }))
    expect(wallet.events.indexOf('switch')).toBeLessThan(wallet.events.indexOf(`chain:${DEFAULT_CHAIN_ID}`))
    expect(wallet.events.indexOf(`chain:${DEFAULT_CHAIN_ID}`)).toBeLessThan(wallet.events.indexOf('sign'))
    expect(wallet.request).toHaveBeenCalledTimes(1)
    expect(useSignaturePrompt.getState().open).toBe(false)
  })

  it('signs directly if the wallet already uses the trading network', async () => {
    const wallet = setup(DEFAULT_CHAIN_ID)
    await act(async () => {
      await wallet.sign()
    })
    expect(wallet.switchNetwork).not.toHaveBeenCalled()
    expect(wallet.request).toHaveBeenCalledTimes(1)
  })

  it('checks the wallet even when Wagmi has a stale cached chain ID', async () => {
    const wallet = setup(DEFAULT_CHAIN_ID)
    wallet.setLiveChainId(mainnet.id)
    await act(async () => {
      await wallet.sign()
    })
    expect(wallet.switchNetwork).toHaveBeenCalledTimes(1)
    expect(wallet.request).toHaveBeenCalledTimes(1)
  })

  it('never signs if the wallet reports a successful switch but stays on Ethereum', async () => {
    const wallet = setup()
    wallet.switchNetwork.mockImplementation(async () => (DEFAULT_CHAIN_ID === polygon.id ? polygon : polygonAmoy))
    await act(async () => {
      await expect(wallet.sign()).rejects.toMatchObject({ name: 'OrderNetworkSwitchError', reason: 'failed' })
    })
    expect(wallet.request).not.toHaveBeenCalled()
    expect(useSignaturePrompt.getState().open).toBe(false)
  })

  it.each([
    ['wallet rejection', new UserRejectedRequestError(new Error('Declined')), 'rejected'],
    ['raw EIP-1193 rejection', { code: 4001, message: 'Cancelled' }, 'rejected'],
    ['RPC failure', new Error('Wallet unavailable'), 'failed'],
  ])('stops before signing after %s', async (_label, error, reason) => {
    const wallet = setup()
    wallet.switchNetwork.mockRejectedValue(error)
    await act(async () => {
      await expect(wallet.sign()).rejects.toMatchObject({ name: 'OrderNetworkSwitchError', reason })
    })
    expect(wallet.request).not.toHaveBeenCalled()
    expect(useSignaturePrompt.getState().open).toBe(false)
  })

  it('stops if the connected wallet does not support network switching', async () => {
    const wallet = setup()
    wallet.connector.switchChain = undefined
    await act(async () => {
      await expect(wallet.sign()).rejects.toMatchObject({ name: 'OrderNetworkSwitchError', reason: 'failed' })
    })
    expect(wallet.request).not.toHaveBeenCalled()
  })

  it('stops if the actual wallet network cannot be read', async () => {
    const wallet = setup()
    wallet.connector.getChainId = mock().mockRejectedValue(new Error('Provider unavailable'))
    await act(async () => {
      await expect(wallet.sign()).rejects.toMatchObject({ name: 'OrderNetworkSwitchError', reason: 'failed' })
    })
    expect(wallet.switchNetwork).not.toHaveBeenCalled()
    expect(wallet.request).not.toHaveBeenCalled()
  })

  it('shows a network prompt and waits for approval before signing', async () => {
    const wallet = setup()
    let approve!: () => void
    wallet.switchNetwork.mockImplementation(async () => {
      await new Promise<void>((resolve) => {
        approve = resolve
      })
      wallet.setLiveChainId(DEFAULT_CHAIN_ID)
      return DEFAULT_CHAIN_ID === polygon.id ? polygon : polygonAmoy
    })
    await act(async () => {
      const pending = wallet.sign()
      await Promise.resolve()
      expect(useSignaturePrompt.getState().title).toBe(`Switch to ${wallet.result.current.networkName}`)
      expect(wallet.request).not.toHaveBeenCalled()
      approve()
      await pending
    })
    expect(wallet.request).toHaveBeenCalledTimes(1)
    expect(useSignaturePrompt.getState().open).toBe(false)
  })

  it('keeps the checked wallet when the active connection changes during switching', async () => {
    const wallet = setup()
    wallet.switchNetwork.mockImplementation(async () => {
      wallet.setLiveChainId(DEFAULT_CHAIN_ID)
      wallet.config.setState((state) => ({ ...state, current: 'another-wallet' }))
      return DEFAULT_CHAIN_ID === polygon.id ? polygon : polygonAmoy
    })
    await act(async () => {
      await wallet.sign()
    })
    expect(wallet.request).toHaveBeenCalledTimes(1)
    expect(wallet.request.mock.calls[0][0].params[0].toLowerCase()).toBe(owner)
  })

  it('does not classify a declined order signature as a failed network switch', async () => {
    const wallet = setup()
    wallet.request.mockRejectedValue(new UserRejectedRequestError(new Error('Signature declined')))
    await act(async () => {
      const error = await wallet.sign().catch((reason) => reason)
      expect(error).not.toBeInstanceOf(OrderNetworkSwitchError)
      expect(error.name).toBe('UserRejectedRequestError')
    })
  })

  it('stops when the wallet is disconnected', async () => {
    const wallet = setup()
    wallet.config.setState((state) => ({ ...state, status: 'disconnected' }))
    await act(async () => {
      await expect(wallet.sign()).rejects.toMatchObject({ name: 'ConnectorNotConnectedError' })
    })
    expect(wallet.switchNetwork).not.toHaveBeenCalled()
    expect(wallet.request).not.toHaveBeenCalled()
  })
})
