import type { ResolvingMetadata } from 'next'

import ResourcePage, { generateResourceMetadata } from '@/components/windmarket/ResourcePage'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateResourceMetadata('bitcoin-up-or-down', parent)
}

export default function BitcoinUpOrDownGuidePage() {
  return <ResourcePage id="bitcoin-up-or-down" />
}
