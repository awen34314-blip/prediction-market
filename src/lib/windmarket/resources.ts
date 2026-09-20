import type { SupportedLocale } from '@/i18n/locales'

import { normalizeEnabledLocales } from '@/i18n/locales'
import { withLocalePrefix } from '@/lib/locale-path'

export type WindMarketResourceLocale = 'en' | 'zh'
export type WindMarketResourceId = 'about' | 'prediction-markets' | 'southeast-asia' | 'bitcoin-up-or-down'

interface ResourceCopy {
  label: string
  title: string
  heading: string
  description: string
}

export const windmarketResources: Record<
  WindMarketResourceId,
  { path: string; updated: string; copy: Record<WindMarketResourceLocale, ResourceCopy> }
> = {
  about: {
    path: '/about',
    updated: '2026-09-21',
    copy: {
      zh: {
        label: '关于风向市场',
        title: '关于风向市场 WindMarket｜东南亚预测市场与社区',
        heading: '面向东南亚的预测市场：风向市场',
        description:
          '认识风向市场 WindMarket：面向东南亚社区的预测市场平台，了解加密货币、股票、黄金等多品类市场的发展方向，以及市场规则、中英文指南与社区。',
      },
      en: {
        label: 'About WindMarket',
        title: 'About WindMarket | Prediction Markets for Southeast Asia',
        heading: 'Prediction markets for Southeast Asia',
        description:
          'Meet WindMarket, a prediction market platform for Southeast Asia, and our plans for markets spanning crypto, stocks, gold and other real-world events.',
      },
    },
  },
  'prediction-markets': {
    path: '/learn/prediction-markets',
    updated: '2026-09-21',
    copy: {
      zh: {
        label: '预测市场入门',
        title: '预测市场是什么？价格、概率与结算入门｜风向市场 WindMarket',
        heading: '预测市场，从读懂一个问题开始',
        description:
          '预测市场价格代表什么？通过简单示例了解概率、买卖价差、成交价格、事件规则与结算，以及使用风向市场前需要核对的信息。',
      },
      en: {
        label: 'Prediction market guide',
        title: 'What Is a Prediction Market? Prices and Settlement | WindMarket',
        heading: 'Start with the question, then read the market',
        description:
          'Learn how prediction markets work: implied probabilities, bid–ask spreads, execution prices, event rules and settlement, with a simple worked example.',
      },
    },
  },
  'southeast-asia': {
    path: '/learn/southeast-asia',
    updated: '2026-09-21',
    copy: {
      zh: {
        label: '东南亚用户指南',
        title: '东南亚预测市场指南：时区、语言与充值须知｜风向市场',
        heading: '东南亚预测市场指南',
        description:
          '为东南亚读者整理的预测市场指南：对照菲律宾、新加坡、马来西亚、泰国、越南与印尼时区，了解中英文阅读、充值网络与服务可用性。',
      },
      en: {
        label: 'Southeast Asia guide',
        title: 'Prediction Markets in Southeast Asia: A User Guide | WindMarket',
        heading: 'A prediction market guide for Southeast Asia',
        description:
          'A practical guide for Southeast Asian readers: compare local time zones, read market rules in context, and understand deposit networks and service availability.',
      },
    },
  },
  'bitcoin-up-or-down': {
    path: '/learn/bitcoin-up-or-down',
    updated: '2026-09-21',
    copy: {
      en: {
        label: 'Bitcoin Up or Down guide',
        title: 'Bitcoin Up or Down: 4-Hour Prediction Market Guide | WindMarket',
        heading: 'How to read a Bitcoin Up or Down market',
        description:
          'Understand a 4-hour Bitcoin prediction market: Price To Beat, Up and Down share prices, Chainlink TWAP rules, settlement and Southeast Asian time zones.',
      },
      zh: {
        label: 'BTC 涨跌市场指南',
        title: 'BTC 涨跌预测怎么看？4 小时市场与结算指南｜风向市场',
        heading: '读懂 BTC 涨跌预测的 4 小时市场',
        description:
          '了解 BTC 涨跌预测市场的固定观察区间、基准价格、份额报价、Chainlink TWAP 数据与结算状态，并对照东南亚当地时区阅读市场规则。',
      },
    },
  },
}

export function getWindMarketResourceLocales(enabledLocales: SupportedLocale[]): WindMarketResourceLocale[] {
  return normalizeEnabledLocales(enabledLocales).filter(
    (locale): locale is WindMarketResourceLocale => locale === 'en' || locale === 'zh',
  )
}

export function getWindMarketResourceHref(id: WindMarketResourceId, locale: string) {
  return withLocalePrefix(windmarketResources[id].path, locale === 'zh' ? 'zh' : 'en')
}

export function getWindMarketResourceLanguages(
  id: WindMarketResourceId,
  enabledLocales: SupportedLocale[],
  siteUrl: string,
) {
  const languages: Record<string, string> = Object.fromEntries(
    getWindMarketResourceLocales(enabledLocales).map((locale) => [
      locale,
      new URL(getWindMarketResourceHref(id, locale), siteUrl).toString(),
    ]),
  )
  languages['x-default'] = new URL(windmarketResources[id].path, siteUrl).toString()
  return languages
}

export function isWindMarketResourcePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '')
  return Object.values(windmarketResources).some((resource) => resource.path === path)
}
