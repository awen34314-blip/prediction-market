import type { MetadataRoute } from 'next'

import { deferPublicShellPrerenderIfNeeded } from '@/lib/public-shell-rendering'
import resolveSiteUrl from '@/lib/site-url'

export default async function robots(): Promise<MetadataRoute.Robots> {
  await deferPublicShellPrerenderIfNeeded()

  const siteUrl = resolveSiteUrl(process.env)

  return {
    rules: [
      {
        userAgent: '*',
        // These public GET endpoints are needed when the homepage hydrates.
        // Keep the exact path/query boundary so nested API routes stay excluded.
        allow: ['/', '/api/events$', '/api/events?', '/api/locales$', '/api/locales?'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
