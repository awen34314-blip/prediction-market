import type { BeforeSendEvent } from '@vercel/analytics/next'

export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = new URL(event.url)
  // Keep account, authentication and admin activity out of public traffic reports.
  if (/\/(?:admin|auth|2fa|profile|settings|portfolio)(?:\/|$)/.test(url.pathname)) {
    return null
  }
  url.search = ''
  url.hash = ''
  return { ...event, url: url.href }
}
