'use client'

import { useExtracted } from 'next-intl'
import { useCallback } from 'react'

/** Translate built-in display labels while preserving custom names and routing slugs. */
export function useCategoryLabel() {
  const t = useExtracted()
  return useCallback(
    (label: string) => {
      switch (label) {
        case 'Crypto':
          return t('Crypto')
        case 'Politics':
          return t('Politics')
        case 'Sports':
          return t('Sports')
        case 'Finance':
          return t('Finance')
        case 'Culture':
          return t('Culture')
        case 'Pop Culture':
          return t('Pop Culture')
        case 'Mentions':
          return t('Mentions')
        case 'Weather':
          return t('Weather')
        case 'Economics':
          return t('Economics')
        case 'Tech':
          return t('Tech')
        case 'AI':
          return t('AI')
        default:
          return label
      }
    },
    [t],
  )
}
