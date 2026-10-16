import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as actualNextCache from 'next/cache'

import { stubEnv, unstubAllEnvs } from '../bun-test-helpers'

const cacheLife = mock()
const runQuery = mock()
mock.module('next/cache', () => ({ ...actualNextCache, cacheLife, cacheTag: mock() }))
mock.module('@/lib/db/utils/run-query', () => ({ runQuery }))
const { SettingsRepository } = await import('@/lib/db/queries/settings')

beforeEach(() => {
  stubEnv('POSTGRES_URL', 'postgres://settings-test')
  cacheLife.mockReset()
  runQuery.mockReset()
})
afterEach(() => unstubAllEnvs())

describe('settings cache recovery', () => {
  it('uses a short failure lifetime and restores normal caching after a successful read', async () => {
    runQuery.mockResolvedValueOnce({ data: null, error: 'Failed to fetch settings.' })
    expect((await SettingsRepository.getSettings()).error).toBe('Failed to fetch settings.')
    expect(cacheLife).toHaveBeenLastCalledWith({ stale: 30, revalidate: 5, expire: 300 })

    const settings = { general: { site_name: { value: 'WindMarket', updated_at: '2026-10-16T00:00:00Z' } } }
    runQuery.mockResolvedValueOnce({ data: settings, error: null })
    expect(await SettingsRepository.getSettings()).toEqual({ data: settings, error: null })
    expect(cacheLife).toHaveBeenLastCalledWith('max')
  })
})
