'use client'

import { useLocale } from 'next-intl'
import { useMemo } from 'react'

import { useSiteIdentity } from '@/hooks/useSiteIdentity'
import { getSitePresentation } from '@/lib/windmarket/site-presentation'

export function useSitePresentation() {
  const site = useSiteIdentity()
  const locale = useLocale()
  return useMemo(() => getSitePresentation(site, locale), [site, locale])
}
