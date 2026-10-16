import type { CustomJavascriptCodeConfig } from '@/lib/custom-javascript-code'

const migratedMarkers = [
  'window.__wmBrandV1',
  'window.__wmHomeV1',
  'window.__wmCommunityBarV2',
  'window.__wmCommunityBarV1',
  'window.__windMarketDepositHelp',
]

/** Keep saved snippets as rollback backups, but never execute the replaced WindMarket widgets. */
export function withoutMigratedWindMarketIntegrations(codes: CustomJavascriptCodeConfig[]) {
  return codes.filter((code) => !migratedMarkers.some((marker) => code.snippet.includes(marker)))
}
