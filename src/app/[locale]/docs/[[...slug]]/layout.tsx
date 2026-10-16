import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { BookOpenIcon, HomeIcon, SquareTerminalIcon } from 'lucide-react'

import DiscordIcon from '@/components/icons/DiscordIcon'
import SiteLogoIcon from '@/components/SiteLogoIcon'
import { getRootLocale } from '@/i18n/root-locale'
import resolveSiteUrl from '@/lib/site-url'
import { source } from '@/lib/source'
import { loadRuntimeThemeState } from '@/lib/theme-settings'
import { getWindMarketResourceHref, windmarketResources } from '@/lib/windmarket/resources'

interface DocsSlugLayoutProps {
  params: Promise<{ locale: string; slug?: string[] }>
  children: ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  const runtimeTheme = await loadRuntimeThemeState()
  const site = runtimeTheme.site

  return {
    title: {
      template: `%s | ${site.name} Documentation`,
      default: `${site.name} Documentation`,
    },
  }
}

export default async function Layout({ children }: DocsSlugLayoutProps) {
  const [runtimeTheme, requestedLocale] = await Promise.all([loadRuntimeThemeState(), getRootLocale()])
  const locale = requestedLocale === 'zh-hant' ? 'zh-hant' : requestedLocale === 'zh' ? 'zh' : 'en'
  const site = runtimeTheme.site

  return (
    <DocsLayout
      nav={{
        url: '/docs',
        title: (
          <>
            <SiteLogoIcon
              logoSvg={site.logoSvg}
              logoImageUrl={site.logoImageUrl}
              alt={`${site.name} logo`}
              className="size-6"
              imageClassName="object-contain"
              size={24}
            />
            <span className="font-medium">{`${site.name} Docs`}</span>
          </>
        ),
        transparentMode: 'top',
      }}
      sidebar={{
        prefetch: true,
        tabs: [
          {
            title: 'Documentation',
            description: 'For Users',
            url: '/docs',
            icon: <BookOpenIcon className="size-4" />,
          },
          {
            title: 'API Reference',
            description: 'For Developers',
            url: '/docs/api-reference',
            icon: <SquareTerminalIcon className="size-4" />,
          },
        ],
      }}
      tree={source.pageTree}
      themeSwitch={{
        mode: 'light-dark-system',
      }}
      links={[
        ...(['deposits', 'withdrawals', 'fees', 'settlement'] as const).map((id) => ({
          type: 'main' as const,
          // The documentation link provider adds a locale to relative paths.
          url: new URL(getWindMarketResourceHref(id, locale), resolveSiteUrl()).toString(),
          text: windmarketResources[id].copy[locale].label,
          icon: <BookOpenIcon />,
        })),
        {
          type: 'main',
          url: '/',
          external: true,
          text: 'Main site',
          icon: <HomeIcon />,
        },
        ...(site.discordLink
          ? [
              {
                type: 'main' as const,
                url: site.discordLink,
                external: true,
                text: 'Get Help',
                icon: <DiscordIcon />,
              },
            ]
          : []),
      ]}
    >
      {children}
    </DocsLayout>
  )
}
