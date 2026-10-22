import type { AnchorHTMLAttributes } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, mock } from 'bun:test'

import type { PortfolioUserOpenOrder } from '@/app/[locale]/(platform)/portfolio/_types/PortfolioOpenOrdersTypes'
import type { PublicPosition } from '@/app/[locale]/(platform)/profile/_components/PublicPositionItem'
import type { ActivityOrder } from '@/types'

import PortfolioOpenOrdersRow from '@/app/[locale]/(platform)/portfolio/_components/PortfolioOpenOrdersRow'
import PublicActivityRow from '@/app/[locale]/(platform)/profile/_components/PublicActivityRow'
import PublicClosedPositionsRow from '@/app/[locale]/(platform)/profile/_components/PublicClosedPositionsRow'
import PublicPositionsRow from '@/app/[locale]/(platform)/profile/_components/PublicPositionsRow'
import en from '@/i18n/messages/en.json'
import zhHant from '@/i18n/messages/zh-hant.json'
import zh from '@/i18n/messages/zh.json'

let locale = 'zh-hant'
const sourceKeys = new Map(Object.entries(en).map(([key, value]) => [value, key]))
void mock.module('next-intl', () => ({
  useLocale: () => locale,
  useExtracted: () => (message: string, values?: Record<string, unknown>) => {
    const messages: Record<string, string> = locale === 'zh-hant' ? zhHant : locale === 'zh' ? zh : en
    return (messages[sourceKeys.get(message) ?? ''] ?? message).replace(/\{(\w+)\}/g, (_, key) =>
      String(values?.[key] ?? key),
    )
  },
}))
void mock.module('@/i18n/navigation', () => ({
  Link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}))
void mock.module('@/components/EventIconImage', () => ({ default: () => null }))

const title = 'Bitcoin Up or Down - October 22, 2:00AM-2:15AM ET'
const slug = 'btc-updown-15m-1792648800'
const position: PublicPosition = {
  id: 'btc-down',
  title,
  slug,
  eventSlug: slug,
  outcome: 'Down',
  outcomeIndex: 1,
  avgPrice: 0.761,
  currentValue: 12.23,
  timestamp: 1,
  status: 'active',
  size: 48.93,
  curPrice: 0.25,
}
const order = {
  id: 'order-1',
  side: 'buy',
  price: 0.761,
  maker_amount: '761000',
  taker_amount: '1000000',
  size_matched: '0',
  expiration: 0,
  created_at: '2026-10-22T06:00:00Z',
  outcome: { index: 1, text: 'Down' },
  market: { condition_id: 'btc-condition', title, slug, icon_url: '' },
} as unknown as PortfolioUserOpenOrder
const activity = {
  id: 'activity-1',
  type: 'trade',
  side: 'buy',
  amount: '48930000',
  price: '0.761',
  total_value: '37240000',
  created_at: '2026-10-22T06:00:00Z',
  outcome: { index: 1, text: 'Down' },
  market: { condition_id: 'btc-condition', title, slug, icon_url: '', event: { slug } },
} as unknown as ActivityOrder

describe('portfolio dynamic content localization', () => {
  beforeEach(() => {
    locale = 'zh-hant'
  })

  it.each([
    ['zh-hant', 'Bitcoin會上漲還是下跌 — 10月22日 凌晨2:00–凌晨2:15 ET', '賣出'],
    ['zh', 'Bitcoin会上涨还是下跌 — 10月22日 2:00–2:15 ET', '卖出'],
  ])(
    'translates active position text in %s while preserving its period, link and action payload',
    (language, expectedTitle, sellLabel) => {
      locale = language
      const onSell = mock()
      render(
        <table>
          <tbody>
            <PublicPositionsRow position={position} onShareClick={() => {}} onSellClick={onSell} />
          </tbody>
        </table>,
      )
      expect(screen.getByRole('link', { name: expectedTitle })).toHaveAttribute('href', `/event/${slug}/${slug}`)
      expect(screen.getByText(/^下跌 76.1/)).toHaveClass('text-no')
      expect(screen.queryByText(/Down/)).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: sellLabel }))
      expect(onSell).toHaveBeenCalledWith(position)
      expect(position.title).toBe(title)
      expect(position.outcome).toBe('Down')
    },
  )

  it('keeps English titles and outcome labels when English is selected', () => {
    locale = 'en'
    render(
      <table>
        <tbody>
          <PublicPositionsRow position={position} onShareClick={() => {}} />
        </tbody>
      </table>,
    )
    expect(screen.getByRole('link', { name: title })).toBeInTheDocument()
    expect(screen.getByText(/^Down 76.1/)).toBeInTheDocument()
  })

  it('translates closed positions and open orders', () => {
    render(
      <table>
        <tbody>
          <PublicClosedPositionsRow position={{ ...position, status: 'closed' }} onShareClick={() => {}} />
          <PortfolioOpenOrdersRow order={order} onCancel={() => {}} isCancelling={false} />
        </tbody>
      </table>,
    )
    expect(screen.getAllByRole('link', { name: 'Bitcoin會上漲還是下跌 — 10月22日 凌晨2:00–凌晨2:15 ET' })).toHaveLength(
      2,
    )
    expect(screen.getByText(/^下跌 76.1/)).toBeInTheDocument()
    expect(screen.getByText('下跌')).toBeInTheDocument()
    expect(screen.queryByText(/Down/)).not.toBeInTheDocument()
  })

  it('translates history title, trade type, direction and share unit', () => {
    render(
      <table>
        <tbody>
          <PublicActivityRow activity={activity} />
        </tbody>
      </table>,
    )
    expect(
      screen.getByRole('link', { name: 'Bitcoin會上漲還是下跌 — 10月22日 凌晨2:00–凌晨2:15 ET' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/^下跌 76/)).toHaveClass('text-no')
    expect(screen.getByText('買入')).toBeInTheDocument()
    expect(screen.queryByText(/\b(?:Bought|Down|shares)\b/)).not.toBeInTheDocument()
    expect(screen.getByText('48.93 份額')).toBeInTheDocument()
  })
})
