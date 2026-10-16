'use client'

import type { ReactNode } from 'react'

import { createContext, use, useMemo } from 'react'

import type { PlatformNavigationTag } from '@/lib/platform-navigation'

import { useCategoryLabel } from '@/hooks/useCategoryLabel'

interface PlatformNavigationContextValue {
  childParentMap: Record<string, string>
  tags: PlatformNavigationTag[]
}

const PlatformNavigationContext = createContext<PlatformNavigationContextValue | null>(null)

function usePlatformNavigationContextValue({ childParentMap, tags }: PlatformNavigationContextValue) {
  const localizeCategoryLabel = useCategoryLabel()
  return useMemo(
    () => ({
      childParentMap,
      tags: tags.map((tag) => ({
        ...tag,
        name: localizeCategoryLabel(tag.name),
        childs: tag.childs.map((child) => ({ ...child, name: localizeCategoryLabel(child.name) })),
      })),
    }),
    [childParentMap, tags, localizeCategoryLabel],
  )
}

export default function PlatformNavigationProvider({
  tags,
  childParentMap,
  children,
}: PlatformNavigationContextValue & { children: ReactNode }) {
  const value = usePlatformNavigationContextValue({ childParentMap, tags })

  return <PlatformNavigationContext value={value}>{children}</PlatformNavigationContext>
}

export function usePlatformNavigationData() {
  const context = use(PlatformNavigationContext)

  if (!context) {
    return {
      childParentMap: {},
      tags: [],
    }
  }

  return context
}
