'use client'

import type { ComponentProps, ReactNode } from 'react'

import { FrameworkProvider } from 'fumadocs-core/framework'
import { RootProvider } from 'fumadocs-ui/provider/base'
import { useParams } from 'next/navigation'

import CanonicalDocsLink from '@/components/DocsLink'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { isDocsPagePath } from '@/lib/docs-seo'

interface DocsRootProviderProps {
  children: ReactNode
}

function DocsLink(props: ComponentProps<typeof Link>) {
  if (typeof props.href === 'string' && isDocsPagePath(props.href)) {
    return <CanonicalDocsLink {...props} href={props.href} />
  }
  return <Link {...props} />
}

export function DocsRootProvider({ children }: DocsRootProviderProps) {
  return (
    <FrameworkProvider
      Link={DocsLink as never}
      usePathname={usePathname as never}
      useRouter={useRouter as never}
      useParams={useParams as never}
    >
      <RootProvider
        search={{
          options: {
            api: '/docs/api/search',
          },
        }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  )
}
