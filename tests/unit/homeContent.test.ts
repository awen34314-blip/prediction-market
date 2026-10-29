import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as actualNextCache from 'next/cache'

import { hoisted, useRealTimers } from '../bun-test-helpers'

const mocks = hoisted(() => ({
  listHomeEventsPage: mock(),
  listHomeFeaturedEvents: mock(),
  listHomeFeaturedHotTopics: mock(),
  getHomeFeaturedSideCard: mock(),
}))

void mock.module('@/lib/home-events-page', () => ({
  listHomeEventsPage: (...args: any[]) => mocks.listHomeEventsPage(...args),
}))

void mock.module('@/lib/home-featured-events', () => ({
  getHomeFeaturedSideCard: (...args: any[]) => mocks.getHomeFeaturedSideCard(...args),
  listHomeFeaturedEvents: (...args: any[]) => mocks.listHomeFeaturedEvents(...args),
  listHomeFeaturedHotTopics: (...args: any[]) => mocks.listHomeFeaturedHotTopics(...args),
}))

void mock.module('next/cache', () => {
  return {
    ...actualNextCache,
    cacheLife: mock(),
    cacheTag: mock(),
  }
})

void mock.module('@/app/[locale]/(platform)/(home)/_components/HomeClient', () => ({
  default: () => null,
}))

describe('homeContent', () => {
  beforeEach(() => {
    mocks.listHomeEventsPage.mockReset().mockResolvedValue({ data: [], error: null })
    mocks.listHomeFeaturedEvents.mockReset().mockResolvedValue([])
    mocks.listHomeFeaturedHotTopics.mockReset().mockResolvedValue([])
    mocks.getHomeFeaturedSideCard.mockReset().mockResolvedValue({ slides: [] })
  })

  afterEach(() => {
    useRealTimers()
  })

  it('uses the route main tag when fetching initial subcategory events without loading footer events', async () => {
    const currentTimestamp = Date.parse('2026-05-11T12:30:00.000Z')
    mocks.listHomeEventsPage.mockResolvedValue({ data: [], error: null })

    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    await HomeContent({
      initialTag: 'ai',
      initialMainTag: 'tech',
      currentTimestamp,
    })

    expect(mocks.listHomeEventsPage).toHaveBeenCalledTimes(1)
    expect(mocks.listHomeEventsPage).toHaveBeenCalledWith(
      expect.objectContaining({
        tag: 'ai',
        mainTag: 'tech',
        locale: 'en',
        currentTimestamp,
      }),
    )
  })

  it.each([true, false])('keeps cache freshness when the SEO page wrapper is %s', async (withPageWrapper) => {
    const currentTimestamp = Date.parse('2026-05-11T12:34:00.000Z')
    const updatedAt = currentTimestamp - 20_000
    mocks.listHomeEventsPage.mockResolvedValueOnce({ data: [], error: null, currentTimestamp, updatedAt })

    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    const result = await HomeContent({
      currentTimestamp,
      withPageWrapper,
    })

    expect(mocks.listHomeEventsPage).toHaveBeenCalledWith(
      expect.objectContaining({
        currentTimestamp,
        includeUpdatedAt: true,
      }),
    )
    const content = result.props.children[1]
    const homeClient = withPageWrapper ? content.props.children : content
    expect(content.type === 'main').toBe(withPageWrapper)
    expect(homeClient.props.initialCurrentTimestamp).toBe(currentTimestamp)
    expect(homeClient.props.initialEventsUpdatedAt).toBe(updatedAt)
  })

  it('does not query hot topics when no featured cards will be rendered', async () => {
    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    await HomeContent({ currentTimestamp: null })

    expect(mocks.listHomeFeaturedEvents).toHaveBeenCalledTimes(1)
    expect(mocks.listHomeFeaturedHotTopics).not.toHaveBeenCalled()
    expect(mocks.getHomeFeaturedSideCard).not.toHaveBeenCalled()
  })

  it('loads hot topics and side-card content when featured markets exist', async () => {
    const featured = [{ featuredId: 'featured-1' }]
    const hotTopics = [{ slug: 'crypto', label: 'Crypto' }]
    mocks.listHomeFeaturedEvents.mockResolvedValueOnce(featured)
    mocks.listHomeFeaturedHotTopics.mockResolvedValueOnce(hotTopics)
    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    await HomeContent({ currentTimestamp: null })

    expect(mocks.listHomeFeaturedHotTopics).toHaveBeenCalledWith('en')
    expect(mocks.getHomeFeaturedSideCard).toHaveBeenCalledWith(featured, hotTopics, 'en')
  })

  it('keeps featured markets when the optional hot-topic query fails', async () => {
    const featured = [{ featuredId: 'featured-1' }]
    mocks.listHomeFeaturedEvents.mockResolvedValueOnce(featured)
    mocks.listHomeFeaturedHotTopics.mockRejectedValueOnce(new Error('Topics unavailable'))
    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    await HomeContent({ currentTimestamp: null })

    expect(mocks.getHomeFeaturedSideCard).toHaveBeenCalledWith(featured, [], 'en')
  })

  it('omits sortBy for the new route so repository keeps newest-first default', async () => {
    mocks.listHomeEventsPage.mockResolvedValueOnce({ data: [], error: null })

    const HomeContent = (await import('@/app/[locale]/(platform)/(home)/_components/HomeContent')).default
    await HomeContent({
      initialTag: 'new',
      currentTimestamp: Date.parse('2026-05-11T12:30:00.000Z'),
    })

    expect(mocks.listHomeEventsPage).toHaveBeenCalledWith(
      expect.not.objectContaining({
        sortBy: expect.anything(),
      }),
    )
  })
})
