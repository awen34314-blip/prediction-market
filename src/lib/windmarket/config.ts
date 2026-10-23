/** Public WindMarket presentation settings. No credentials or wallet addresses belong here. */
export const windmarket = {
  name: '風向市場',
  website: 'https://windmarket.top',
  organizationId: 'https://windmarket.top/#organization',
  socialProfiles: ['https://x.com/WindMarketHQ', 'https://t.me/WindMarketOfficial'],
  alternateNames: ['WindMarket', '風向市場', '风向市场', 'WindMarket 風向市場', 'WindMarket 风向市场'],
  community: {
    enabled: true,
    url: 'https://t.me/WindMarketOfficial',
  },
  depositSupport: {
    enabled: true,
    url: 'https://t.me/WindMarketOfficial',
  },
} as const

export function getWindMarketName(locale: string) {
  return locale === 'zh-hant' ? '風向市場' : locale === 'zh' ? '风向市场' : 'WindMarket'
}
