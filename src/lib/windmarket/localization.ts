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
      'WindMarket is a prediction market platform for Southeast Asia. Start with current markets and learn about planned categories including stocks, gold and more.',
    ogLocale: 'en_US',
  },
  zh: {
    community: '风向市场社区',
    communityDetail: '交流预测 · 充值帮助',
    join: '加入社区',
    depositSupport: '充值客服',
    depositSupportDetail: '联系客户服务 · Telegram',
    title: '东南亚预测市场｜风向市场 WindMarket',
    description:
      '风向市场 WindMarket 专注东南亚预测市场。浏览当前市场，了解市场概率、规则与结算；后续计划扩展股票、黄金及更多事件类别。',
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
      'WindMarket ist eine Plattform für Prognosemärkte mit Fokus auf Communitys in Südostasien. Entdecke Marktwahrscheinlichkeiten, Regeln und Abrechnung sowie Leitfäden auf Englisch und Chinesisch.',
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
      'WindMarket es una plataforma de predicción de eventos reales centrada en las comunidades del Sudeste Asiático. Explora probabilidades, reglas y liquidación, con guías en inglés y chino.',
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
      'WindMarket é uma plataforma de previsão de eventos reais voltada às comunidades do Sudeste Asiático. Explore probabilidades, regras e liquidação, com guias em inglês e chinês.',
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
      'WindMarket est une plateforme de prédiction axée sur les communautés d’Asie du Sud-Est. Découvrez les probabilités, les règles et le règlement des marchés, avec des guides en anglais et en chinois.',
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
      'WindMarket は東南アジアのコミュニティに向けた、現実の出来事を対象とする予測市場プラットフォームです。市場の確率、ルール、決済の仕組みを確認でき、英語と中国語の入門ガイドも用意しています。',
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
      'WindMarket منصة لتوقع الأحداث الواقعية تركز على مجتمعات جنوب شرق آسيا. استكشف احتمالات السوق والقواعد والتسوية، مع أدلة بالإنجليزية والصينية.',
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
      'WindMarket — платформа прогнозов на реальные события для сообществ Юго-Восточной Азии. Изучайте вероятности, правила и расчёты, а также руководства на английском и китайском языках.',
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
      'WindMarket è una piattaforma di previsione di eventi reali rivolta alle comunità del Sud-est asiatico. Esplora probabilità, regole e liquidazione, con guide in inglese e cinese.',
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
      'WindMarket to platforma prognoz dotyczących rzeczywistych wydarzeń dla społeczności Azji Południowo-Wschodniej. Poznaj prawdopodobieństwa, zasady i rozliczanie oraz poradniki po angielsku i chińsku.',
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
      'WindMarket은 동남아시아 커뮤니티를 위한 실제 사건 예측 플랫폼입니다. 시장 확률, 규칙, 정산 방식을 살펴보고 영어와 중국어 입문 가이드를 읽어 보세요.',
    ogLocale: 'ko_KR',
  },
}

export function getWindMarketCopy(locale: string) {
  return copy[resolveSupportedLocale(locale)]
}
