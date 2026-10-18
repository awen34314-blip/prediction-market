import type { SupportedLocale } from '@/i18n/locales'

import { resolveSupportedLocale } from '@/i18n/locales'

interface WindMarketCopy {
  community: string
  communityDetail: string
  join: string
  depositSupport: string
  depositSupportDetail: string
  title: string
  description: string
  ogLocale: string
}

const copy: Record<SupportedLocale, WindMarketCopy> = {
  en: {
    community: 'WindMarket community',
    communityDetail: 'Discuss markets · Deposit support',
    join: 'Join community',
    depositSupport: 'Deposit support',
    depositSupportDetail: 'Get help with your deposit · Telegram',
    title: 'Prediction Markets for Southeast Asia | WindMarket',
    description:
      'Explore WindMarket prediction markets for Southeast Asia. Read crypto, stock and gold market probabilities, event rules and settlement details.',
    ogLocale: 'en_US',
  },
  'zh-hant': {
    community: '風向市場社區',
    communityDetail: '交流預測 · 充值幫助',
    join: '加入社區',
    depositSupport: '充值客服',
    depositSupportDetail: '聯繫客戶服務 · Telegram',
    title: '東南亞預測市場｜風向市場 WindMarket',
    description:
      '風向市場 WindMarket 專注東南亞預測市場，涵蓋加密貨幣、股票、黃金等多種類別。瀏覽市場概率，瞭解事件規則與結算方式。',
    ogLocale: 'zh_TW',
  },
  zh: {
    community: '风向市场社区',
    communityDetail: '交流预测 · 充值帮助',
    join: '加入社区',
    depositSupport: '充值客服',
    depositSupportDetail: '联系客户服务 · Telegram',
    title: '东南亚预测市场｜风向市场 WindMarket',
    description:
      '风向市场 WindMarket 专注东南亚预测市场，涵盖加密货币、股票、黄金等多种类别。浏览市场概率，了解事件规则与结算方式。',
    ogLocale: 'zh_CN',
  },
  de: {
    community: 'WindMarket Community',
    communityDetail: 'Märkte diskutieren · Hilfe bei Einzahlungen',
    join: 'Beitreten',
    depositSupport: 'Hilfe bei Einzahlungen',
    depositSupportDetail: 'Support kontaktieren · Telegram',
    title: 'Prognosemärkte für Südostasien | WindMarket',
    description:
      'WindMarket: Prognosemärkte für Südostasien zu Krypto, Aktien, Gold und realen Ereignissen. Entdecke Wahrscheinlichkeiten, Regeln und Abrechnung.',
    ogLocale: 'de_DE',
  },
  es: {
    community: 'Comunidad WindMarket',
    communityDetail: 'Debate sobre mercados · Ayuda con depósitos',
    join: 'Unirse',
    depositSupport: 'Ayuda con depósitos',
    depositSupportDetail: 'Contactar con soporte · Telegram',
    title: 'Mercados de predicción para el Sudeste Asiático | WindMarket',
    description:
      'Explora WindMarket, mercados de predicción para el Sudeste Asiático sobre cripto, acciones y oro. Consulta probabilidades, reglas y liquidación.',
    ogLocale: 'es_ES',
  },
  pt: {
    community: 'Comunidade WindMarket',
    communityDetail: 'Discussão de mercados · Ajuda com depósitos',
    join: 'Participar',
    depositSupport: 'Ajuda com depósitos',
    depositSupportDetail: 'Fale com o suporte · Telegram',
    title: 'Mercados de previsão para o Sudeste Asiático | WindMarket',
    description:
      'Explore a WindMarket: mercados de previsão para o Sudeste Asiático sobre cripto, ações e ouro. Consulte probabilidades, regras e liquidação.',
    ogLocale: 'pt_BR',
  },
  fr: {
    community: 'Communauté WindMarket',
    communityDetail: 'Discuter des marchés · Aide aux dépôts',
    join: 'Rejoindre',
    depositSupport: 'Aide aux dépôts',
    depositSupportDetail: 'Contacter le support · Telegram',
    title: 'Marchés prédictifs pour l’Asie du Sud-Est | WindMarket',
    description:
      'WindMarket : marchés prédictifs pour l’Asie du Sud-Est sur les cryptos, actions et l’or. Consultez les probabilités, règles et modalités de règlement.',
    ogLocale: 'fr_FR',
  },
  ja: {
    community: 'WindMarket コミュニティ',
    communityDetail: '市場について話す · 入金サポート',
    join: '参加する',
    depositSupport: '入金サポート',
    depositSupportDetail: 'サポートに問い合わせ · Telegram',
    title: '東南アジアのコミュニティに向けた予測市場 | WindMarket',
    description:
      'WindMarket は東南アジアのコミュニティに向けて、暗号資産、株式、金などの予測市場を提供しています。市場の確率、ルール、決済の仕組みを確認できます。',
    ogLocale: 'ja_JP',
  },
  ar: {
    community: 'مجتمع WindMarket',
    communityDetail: 'ناقش الأسواق · مساعدة في الإيداع',
    join: 'انضم للمجتمع',
    depositSupport: 'مساعدة في الإيداع',
    depositSupportDetail: 'تواصل مع الدعم · Telegram',
    title: 'أسواق التوقعات لمجتمعات جنوب شرق آسيا | WindMarket',
    description:
      'تقدم WindMarket لمجتمعات جنوب شرق آسيا أسواق توقعات للعملات المشفرة والأسهم والذهب وأحداث واقعية أخرى. استكشف احتمالات السوق والقواعد والتسوية.',
    ogLocale: 'ar_SA',
  },
  ru: {
    community: 'Сообщество WindMarket',
    communityDetail: 'Обсуждение рынков · Помощь с пополнением',
    join: 'Присоединиться',
    depositSupport: 'Помощь с пополнением',
    depositSupportDetail: 'Связаться с поддержкой · Telegram',
    title: 'Рынки прогнозов для Юго-Восточной Азии | WindMarket',
    description:
      'WindMarket: рынки прогнозов для Юго-Восточной Азии о криптовалютах, акциях, золоте и реальных событиях. Изучайте вероятности, правила и расчёты.',
    ogLocale: 'ru_RU',
  },
  it: {
    community: 'Community WindMarket',
    communityDetail: 'Discussioni sui mercati · Assistenza depositi',
    join: 'Unisciti',
    depositSupport: 'Assistenza depositi',
    depositSupportDetail: 'Contatta il supporto · Telegram',
    title: 'Mercati di previsione per il Sud-est asiatico | WindMarket',
    description:
      'WindMarket: mercati di previsione per il Sud-est asiatico su cripto, azioni e oro. Scopri probabilità, regole dei mercati e liquidazione.',
    ogLocale: 'it_IT',
  },
  pl: {
    community: 'Społeczność WindMarket',
    communityDetail: 'Dyskusje o rynkach · Pomoc z wpłatami',
    join: 'Dołącz',
    depositSupport: 'Pomoc z wpłatami',
    depositSupportDetail: 'Skontaktuj się z pomocą · Telegram',
    title: 'Rynki prognostyczne dla Azji Południowo-Wschodniej | WindMarket',
    description:
      'WindMarket: rynki prognostyczne dla Azji Południowo-Wschodniej o kryptowalutach, akcjach i złocie. Poznaj prawdopodobieństwa, zasady i rozliczanie.',
    ogLocale: 'pl_PL',
  },
  ko: {
    community: 'WindMarket 커뮤니티',
    communityDetail: '시장 토론 · 입금 지원',
    join: '참여하기',
    depositSupport: '입금 지원',
    depositSupportDetail: '고객 지원 문의 · Telegram',
    title: '동남아시아 커뮤니티를 위한 예측 시장 | WindMarket',
    description:
      'WindMarket은 동남아시아 커뮤니티를 위해 암호화폐, 주식, 금 등 다양한 예측 시장을 제공합니다. 시장 확률, 규칙, 정산 방식을 확인하세요.',
    ogLocale: 'ko_KR',
  },
}

export function getWindMarketCopy(locale: string) {
  return copy[resolveSupportedLocale(locale)]
}
