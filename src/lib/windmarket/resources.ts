import type { SupportedLocale } from '@/i18n/locales'

import { normalizeEnabledLocales } from '@/i18n/locales'
import { withLocalePrefix } from '@/lib/locale-path'

export type WindMarketResourceLocale = 'en' | 'zh' | 'zh-hant'
export type WindMarketResourceId =
  | 'about'
  | 'prediction-markets'
  | 'southeast-asia'
  | 'bitcoin-up-or-down'
  | 'deposits'
  | 'withdrawals'
  | 'fees'
  | 'settlement'

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
    updated: '2026-10-16',
    copy: {
      'zh-hant': {
        label: '關於風向市場',
        title: '關於風向市場｜東南亞預測市場與社區',
        heading: '面向東南亞的預測市場：風向市場',
        description:
          '認識風向市場：面向東南亞社區的預測市場平臺，瞭解加密貨幣、股票、黃金等多品類市場，以及市場規則、中英文指南與社區。',
      },
      zh: {
        label: '关于风向市场',
        title: '关于风向市场｜东南亚预测市场与社区',
        heading: '面向东南亚的预测市场：风向市场',
        description:
          '认识风向市场：面向东南亚社区的预测市场平台，了解加密货币、股票、黄金等多品类市场，以及市场规则、中英文指南与社区。',
      },
      en: {
        label: 'About WindMarket',
        title: 'About WindMarket | Prediction Markets for Southeast Asia',
        heading: 'Prediction markets for Southeast Asia',
        description:
          'Meet WindMarket, a prediction market platform for Southeast Asia, with markets spanning crypto, stocks, gold and other real-world events.',
      },
    },
  },
  'prediction-markets': {
    path: '/learn/prediction-markets',
    updated: '2026-10-19',
    copy: {
      'zh-hant': {
        label: '預測市場入門',
        title: '預測市場是什麼？價格、概率與結算入門｜風向市場',
        heading: '預測市場，從讀懂一個問題開始',
        description:
          '通過訂單簿示例讀懂預測市場的價格、概率、掛單數量、金額、點差與平均成交價，並瞭解事件規則、結算和使用前的核對事項。',
      },
      zh: {
        label: '预测市场入门',
        title: '预测市场是什么？价格、概率与结算入门｜风向市场',
        heading: '预测市场，从读懂一个问题开始',
        description:
          '通过订单簿示例读懂预测市场的价格、概率、挂单数量、金额、点差与平均成交价，并了解事件规则、结算和使用前的核对事项。',
      },
      en: {
        label: 'Prediction market guide',
        title: 'What Is a Prediction Market? Prices and Settlement | WindMarket',
        heading: 'Start with the question, then read the market',
        description:
          'Understand prediction-market prices, probabilities, order-book depth, spreads and average fill prices with worked examples and settlement basics.',
      },
    },
  },
  'southeast-asia': {
    path: '/learn/southeast-asia',
    updated: '2026-09-22',
    copy: {
      'zh-hant': {
        label: '東南亞用戶指南',
        title: '東南亞預測市場指南：時區、語言與充值須知｜風向市場',
        heading: '東南亞預測市場指南',
        description:
          '為東南亞讀者整理的預測市場指南：對照菲律賓、新加坡、馬來西亞、泰國、越南與印尼時區，瞭解中英文閱讀、充值網絡與服務可用性。',
      },
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
    updated: '2026-10-16',
    copy: {
      en: {
        label: 'Bitcoin Up or Down guide',
        title: 'Bitcoin Up or Down: 5m, 15m and 4h Markets | WindMarket',
        heading: 'How to read a Bitcoin Up or Down market',
        description:
          'Read 5-minute, 15-minute and 4-hour Bitcoin markets: observation windows, Price To Beat, share prices, resolution sources, settlement and local time zones.',
      },
      'zh-hant': {
        label: 'BTC 漲跌市場指南',
        title: 'BTC 漲跌預測怎麼看？5 分鐘、15 分鐘與 4 小時指南｜風向市場',
        heading: '讀懂 BTC 的 5 分鐘、15 分鐘與 4 小時市場',
        description:
          '瞭解 BTC 5 分鐘、15 分鐘和 4 小時市場的固定觀察區間、基準價格、份額報價、結算來源與狀態，並對照當地時區閱讀各市場規則。',
      },
      zh: {
        label: 'BTC 涨跌市场指南',
        title: 'BTC 涨跌预测怎么看？5 分钟、15 分钟与 4 小时指南｜风向市场',
        heading: '读懂 BTC 的 5 分钟、15 分钟与 4 小时市场',
        description:
          '了解 BTC 5 分钟、15 分钟和 4 小时市场的固定观察区间、基准价格、份额报价、结算来源与状态，并对照当地时区阅读各市场规则。',
      },
    },
  },
  deposits: {
    path: '/learn/deposits',
    updated: '2026-10-16',
    copy: {
      zh: {
        label: '充值指南',
        title: '风向市场怎么充值？币种、网络与到账核对',
        heading: '风向市场充值指南',
        description:
          '了解风向市场的充值入口、钱包转入与直接转账，核对 USDC、网络、充值地址和到账状态，并查找未到账问题。',
      },
      en: {
        label: 'Deposit guide',
        title: 'How to Deposit: Networks and Balance Checks | WindMarket',
        heading: 'Funding your WindMarket account',
        description:
          'Find the deposit flow and check the asset, network and wallet address. Learn how to confirm that a transfer has reached your trading balance.',
      },
      'zh-hant': {
        label: '充值指南',
        title: '風向市場怎麼充值？幣種、網絡與到賬核對',
        heading: '風向市場充值指南',
        description:
          '瞭解風向市場的充值入口、錢包轉入與直接轉賬，核對 USDC、網絡、充值地址和到賬狀態，並查找未到賬問題。',
      },
    },
  },
  withdrawals: {
    path: '/learn/withdrawals',
    updated: '2026-10-16',
    copy: {
      zh: {
        label: '提现指南',
        title: '风向市场怎么提现？地址、余额与交易状态',
        heading: '风向市场提现指南',
        description: '了解风向市场的提现入口，区分可用余额、持仓与待领取收益，核对收款地址、网络及提现后的交易状态。',
      },
      en: {
        label: 'Withdrawal guide',
        title: 'How to Withdraw: Addresses and Available Funds | WindMarket',
        heading: 'Withdrawing from WindMarket',
        description:
          'Check available trading funds, distinguish positions from claimable winnings, verify the receiving address and network, and follow a submitted withdrawal.',
      },
      'zh-hant': {
        label: '提現指南',
        title: '風向市場怎麼提現？地址、餘額與交易狀態',
        heading: '風向市場提現指南',
        description: '瞭解風向市場的提現入口，區分可用餘額、持倉與待領取收益，核對收款地址、網絡及提現後的交易狀態。',
      },
    },
  },
  fees: {
    path: '/learn/fees',
    updated: '2026-10-16',
    copy: {
      zh: {
        label: '费用说明',
        title: '风向市场手续费怎么看？交易费与充值提现费用',
        heading: '读懂风向市场的费用',
        description:
          '区分风向市场交易手续费、买卖价差、网络费及支付渠道费，了解 maker 与 taker 的区别，并核对订单预览和实际成交记录。',
      },
      en: {
        label: 'Fees explained',
        title: 'Trading, Network and Funding Fees Explained | WindMarket',
        heading: 'Understanding WindMarket fees',
        description:
          'Distinguish trading fees, bid–ask spread, network costs and provider charges. Learn how maker and taker execution differ and where to verify final charges.',
      },
      'zh-hant': {
        label: '費用說明',
        title: '風向市場手續費怎麼看？交易費與充值提現費用',
        heading: '讀懂風向市場的費用',
        description:
          '區分風向市場交易手續費、買賣價差、網絡費及支付渠道費，瞭解 maker 與 taker 的區別，並核對訂單預覽和實際成交記錄。',
      },
    },
  },
  settlement: {
    path: '/learn/settlement',
    updated: '2026-10-16',
    copy: {
      zh: {
        label: '结算与领取',
        title: '风向市场如何结算？结果判定与收益领取',
        heading: '市场结算与收益领取',
        description: '了解风向市场市场结束、结果确认、份额领取与提现的区别，阅读结算来源及特殊情况，并核对可领取状态。',
      },
      en: {
        label: 'Settlement and claims',
        title: 'Market Settlement and Claiming Winnings | WindMarket',
        heading: 'Market settlement and claiming winnings',
        description:
          'Distinguish an event ending, its result becoming final, claiming shares and withdrawing funds. Check resolution criteria, sources and claimable status.',
      },
      'zh-hant': {
        label: '結算與領取',
        title: '風向市場如何結算？結果判定與收益領取',
        heading: '市場結算與收益領取',
        description: '瞭解風向市場市場結束、結果確認、份額領取與提現的區別，閱讀結算來源及特殊情況，並核對可領取狀態。',
      },
    },
  },
}

export function getWindMarketResourceLocales(enabledLocales: SupportedLocale[]): WindMarketResourceLocale[] {
  return normalizeEnabledLocales(enabledLocales).filter(
    (locale): locale is WindMarketResourceLocale => locale === 'en' || locale === 'zh' || locale === 'zh-hant',
  )
}

export function getWindMarketResourceHref(id: WindMarketResourceId, locale: string) {
  return withLocalePrefix(
    windmarketResources[id].path,
    locale === 'zh-hant' ? 'zh-hant' : locale === 'zh' ? 'zh' : 'en',
  )
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
