import { GET as resolveLiveSeriesLink } from '@/app/api/home-featured/live-link/route'

export async function GET(request: Request, { params }: { params: Promise<{ locale: string; seriesSlug: string }> }) {
  const { locale, seriesSlug } = await params
  const url = new URL(request.url)
  url.searchParams.set('locale', locale)
  url.searchParams.set('seriesSlug', seriesSlug)

  // Keep document navigation on a market URL; the existing resolver stays uncached.
  return resolveLiveSeriesLink(new Request(url))
}
