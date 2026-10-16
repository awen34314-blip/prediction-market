import type { ResolvingMetadata } from 'next'

import ResourcePage, { generateResourceMetadata } from '@/components/windmarket/ResourcePage'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateResourceMetadata('about', parent)
}

export default function AboutPage() {
  return <ResourcePage id="about" />
}
