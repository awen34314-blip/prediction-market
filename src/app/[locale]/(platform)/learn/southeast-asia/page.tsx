import type { ResolvingMetadata } from 'next'

import ResourcePage, { generateResourceMetadata } from '@/components/windmarket/ResourcePage'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateResourceMetadata('southeast-asia', parent)
}

export default function SoutheastAsiaGuidePage() {
  return <ResourcePage id="southeast-asia" />
}
