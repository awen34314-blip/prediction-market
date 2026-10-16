import type { MetadataRoute } from 'next'

import { stripLocalePrefix } from '@/lib/locale-path'

/** The documentation has one English content source, independent of the translated application UI. */
export function isDocsPagePath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname)
  return (path === '/docs' || path.startsWith('/docs/')) && path !== '/docs/api' && !path.startsWith('/docs/api/')
}

export function getCanonicalDocsPath(pathname: string): string {
  return stripLocalePrefix(pathname).replace(/\/+$/, '')
}

export function buildCanonicalDocsSitemap(
  entries: readonly { path: string }[],
  siteUrl: string,
): MetadataRoute.Sitemap {
  const paths = new Set(entries.map(({ path }) => getCanonicalDocsPath(path)))
  return [...paths].filter(isDocsPagePath).map((path) => ({ url: new URL(path, siteUrl).toString() }))
}
