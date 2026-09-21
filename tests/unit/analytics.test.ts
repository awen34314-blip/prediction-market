import { describe, expect, it } from 'bun:test'

import { sanitizeAnalyticsEvent } from '@/lib/analytics'

describe('public web analytics', () => {
  it('keeps public market routes without query values or fragments', () => {
    expect(
      sanitizeAnalyticsEvent({
        type: 'pageview',
        url: 'https://app.windmarket.top/zh/event/bitcoin?token=private-value&wallet=private-value#private-value',
      }),
    ).toEqual({ type: 'pageview', url: 'https://app.windmarket.top/zh/event/bitcoin' })
  })

  it('excludes private and administrative routes in any language', () => {
    for (const path of [
      '/admin',
      '/zh/admin/users',
      '/auth/callback',
      '/zh/2fa',
      '/profile/some-user',
      '/zh/settings/account',
      '/portfolio',
    ]) {
      expect(sanitizeAnalyticsEvent({ type: 'pageview', url: `https://app.windmarket.top${path}` })).toBeNull()
    }
  })

  it('does not suppress public events that mention private route names in their slug', () => {
    expect(
      sanitizeAnalyticsEvent({ type: 'pageview', url: 'https://app.windmarket.top/event/new-admin-elected' }),
    ).not.toBeNull()
  })
})
