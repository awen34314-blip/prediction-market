import type { Route } from 'next'
import type { UrlObject } from 'node:url'
import type { ComponentProps } from 'react'

import NextLink from 'next/link'

import { getCanonicalDocsPath } from '@/lib/docs-seo'

/** Use the English document's canonical path without next-intl forcing a locale prefix. */
export default function DocsLink({
  href,
  ...props
}: Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string | UrlObject }) {
  const canonicalHref =
    typeof href === 'string'
      ? (getCanonicalDocsPath(href) as Route)
      : { ...href, pathname: getCanonicalDocsPath(href.pathname ?? '/docs') }
  return <NextLink {...props} href={canonicalHref} locale={undefined} />
}
