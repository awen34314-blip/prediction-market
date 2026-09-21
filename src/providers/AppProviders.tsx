'use client'

import type { ReactNode } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { lazy, Suspense } from 'react'

import { Toaster } from '@/components/ui/toast'
import { useHasHydrated } from '@/hooks/useHasHydrated'
import { usePublicRuntimeConfig } from '@/hooks/usePublicRuntimeConfig'
import { useSiteIdentity } from '@/hooks/useSiteIdentity'
import { sanitizeAnalyticsEvent } from '@/lib/analytics'
import ProgressIndicatorProvider from '@/providers/ProgressIndicatorProvider'

const SpeedInsights = lazy(async () => {
  const mod = await import('@vercel/speed-insights/next')
  return { default: mod.SpeedInsights }
})

const queryClient = new QueryClient()

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const site = useSiteIdentity()
  const { isVercel } = usePublicRuntimeConfig()
  const hasHydrated = useHasHydrated()
  const gaId = site.googleAnalyticsId
  const shouldRenderVercelInsights = process.env.NODE_ENV === 'production' && hasHydrated && isVercel === 'true'

  const content = (
    <div className="min-h-screen bg-background">
      {children}
      <Toaster position="bottom-left" />
      {shouldRenderVercelInsights && (
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics beforeSend={sanitizeAnalyticsEvent} />
        </Suspense>
      )}
      {process.env.NODE_ENV === 'production' && gaId && <GoogleAnalytics gaId={gaId} />}
    </div>
  )

  return (
    <ProgressIndicatorProvider>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
      </ThemeProvider>
    </ProgressIndicatorProvider>
  )
}
