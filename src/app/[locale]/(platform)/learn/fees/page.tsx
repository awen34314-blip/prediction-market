import type { ResolvingMetadata } from 'next'

import ResourcePage, { generateResourceMetadata } from '@/components/windmarket/ResourcePage'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateResourceMetadata('fees', parent)
}

export default function GuidePage() {
  return <ResourcePage id="fees" />
}
