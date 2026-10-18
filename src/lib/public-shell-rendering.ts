import { io } from 'next/cache'

import { resolvePublicShellCacheMode, resolvePublicShellPrerenderMode } from '@/lib/public-shell-env'

export function shouldPrerenderPublicShell() {
  return resolvePublicShellPrerenderMode(process.env)
}

export function shouldCachePublicShell() {
  return resolvePublicShellCacheMode(process.env)
}

export async function deferPublicShellPrerenderIfNeeded() {
  if (shouldPrerenderPublicShell()) {
    return
  }

  await io()
}
