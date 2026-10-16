'use client'

import { useLocale } from 'next-intl'
import { useEffect, useRef } from 'react'

import { resolveSupportedLocale } from '@/i18n/locales'
import { watchAppKitLocale } from '@/lib/appkit-i18n/localize-modal'

export function AppKitLocaleSynchronizer() {
  const locale = resolveSupportedLocale(useLocale())
  const localizer = useRef<ReturnType<typeof watchAppKitLocale> | null>(null)

  useEffect(() => {
    const watcher = watchAppKitLocale('en')
    localizer.current = watcher
    return () => {
      watcher.dispose()
      localizer.current = null
    }
  }, [])

  useEffect(() => {
    localizer.current?.setLocale(locale)
  }, [locale])

  return null
}
