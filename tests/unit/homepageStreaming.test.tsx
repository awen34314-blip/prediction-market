import { describe, expect, it, mock } from 'bun:test'
import { renderToReadableStream } from 'react-dom/server'

let releaseMarkets: () => void
const marketsReady = new Promise<void>((resolve) => {
  releaseMarkets = resolve
})
let marketWrapper: boolean | undefined

mock.module('@/i18n/root-locale', () => ({ getRootLocale: async () => 'zh' }))
mock.module('@/i18n/locale-settings', () => ({ loadEnabledLocales: async () => ['zh'] }))
mock.module('@/app/[locale]/(platform)/(home)/_components/HomeInitialContent', () => ({
  default: async ({ withPageWrapper }: { withPageWrapper?: boolean }) => {
    marketWrapper = withPageWrapper
    await marketsReady
    return <section>Markets loaded</section>
  },
}))
mock.module('@/app/[locale]/(platform)/(home)/_components/EventsGridSkeleton', () => ({
  default: () => <div>Loading markets</div>,
}))

const { default: HomePage } = await import('@/app/[locale]/(platform)/(home)/page')

describe('homepage streaming', () => {
  it('streams the market loading state without a separate brand introduction', async () => {
    const stream = await renderToReadableStream(await HomePage())
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let html = decoder.decode((await reader.read()).value)

    try {
      expect(html).not.toContain('windmarket-home-title')
      expect(html).not.toContain('浏览市场概率，了解事件规则与结算方式。')
      expect(html).toContain('Loading markets')
      expect(html).not.toContain('Markets loaded')
    } finally {
      releaseMarkets!()
    }

    for (;;) {
      const chunk = await reader.read()
      if (chunk.done) {
        break
      }
      html += decoder.decode(chunk.value)
    }
    expect(html).toContain('Markets loaded')
    expect(html.match(/<main\b/g)).toHaveLength(1)
    expect(marketWrapper).toBe(false)
  })
})
