import type { ResolvingMetadata } from 'next'

import ResourcePage, { generateResourceMetadata } from '@/components/windmarket/ResourcePage'

export const instant = false

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateResourceMetadata('prediction-markets', parent)
}

export default function PredictionMarketGuidePage() {
  return <ResourcePage id="prediction-markets" />
}
