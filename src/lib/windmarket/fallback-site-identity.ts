import type { ThemeSiteIdentity } from '@/lib/theme-site-identity'

import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketCopy } from '@/lib/windmarket/localization'

const FALLBACK_LOGO_URL = '/images/logos/windmarket.png'

/** Keep the public brand intact while unavailable settings remain eligible for a retry. */
export function getWindMarketFallbackIdentity(site: ThemeSiteIdentity, siteUrl: string): ThemeSiteIdentity {
  let hostname: string
  try {
    hostname = new URL(siteUrl).hostname
  } catch {
    return site
  }

  if (hostname !== 'app.windmarket.top' && hostname !== 'windmarket.top') {
    return site
  }

  return {
    ...site,
    name: windmarket.name,
    description: getWindMarketCopy('en').description,
    logoMode: 'image',
    logoImagePath: null,
    logoImageUrl: FALLBACK_LOGO_URL,
    logoUrl: FALLBACK_LOGO_URL,
    pwaIcon192Url: FALLBACK_LOGO_URL,
    pwaIcon512Url: FALLBACK_LOGO_URL,
    appleTouchIconUrl: FALLBACK_LOGO_URL,
    twitterLink: windmarket.socialProfiles[0],
    supportUrl: windmarket.depositSupport.url,
  }
}
