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
    title: 'WindMarket | Prediction Markets for Real-World Events',
    description:
      'Explore prediction markets for real-world events on WindMarket. View market probabilities and learn about event rules and settlement.',
    ogLocale: 'en_US',
  },
  zh: {
    community: 'WindMarket 社区',
    communityDetail: '交流预测 · 充值帮助',
    join: '加入社区',
    depositSupport: '充值客服',
    depositSupportDetail: '联系客户服务 · Telegram',
    title: 'WindMarket 风向市场｜真实世界事件预测市场',
    description:
      'WindMarket 风向市场是一个真实世界事件预测平台。浏览市场概率，了解事件规则与结算方式，与社区交流你的判断。',
    ogLocale: 'zh_CN',
  },
  de: {
    community: 'WindMarket Community',
    communityDetail: 'Märkte diskutieren · Hilfe bei Einzahlungen',
    join: 'Beitreten',
    depositSupport: 'Hilfe bei Einzahlungen',
    depositSupportDetail: 'Support kontaktieren · Telegram',
    title: 'WindMarket | Prognosemärkte für reale Ereignisse',
    description:
      'Entdecke Prognosemärkte für reale Ereignisse auf WindMarket. Sieh dir Marktwahrscheinlichkeiten an und informiere dich über Regeln und Abrechnung.',
    ogLocale: 'de_DE',
  },
  es: {
    community: 'Comunidad WindMarket',
    communityDetail: 'Debate sobre mercados · Ayuda con depósitos',
    join: 'Unirse',
    depositSupport: 'Ayuda con depósitos',
    depositSupportDetail: 'Contactar con soporte · Telegram',
    title: 'WindMarket | Mercados de predicción sobre eventos reales',
    description:
      'Explora mercados de predicción sobre eventos reales en WindMarket. Consulta las probabilidades del mercado y conoce las reglas y la liquidación.',
    ogLocale: 'es_ES',
  },
  pt: {
    community: 'Comunidade WindMarket',
    communityDetail: 'Discussão de mercados · Ajuda com depósitos',
    join: 'Participar',
    depositSupport: 'Ajuda com depósitos',
    depositSupportDetail: 'Fale com o suporte · Telegram',
    title: 'WindMarket | Mercados de previsão sobre eventos reais',
    description:
      'Explore mercados de previsão sobre eventos reais na WindMarket. Veja as probabilidades do mercado e conheça as regras e a liquidação.',
    ogLocale: 'pt_BR',
  },
  fr: {
    community: 'Communauté WindMarket',
    communityDetail: 'Discuter des marchés · Aide aux dépôts',
    join: 'Rejoindre',
    depositSupport: 'Aide aux dépôts',
    depositSupportDetail: 'Contacter le support · Telegram',
    title: 'WindMarket | Marchés prédictifs sur des événements réels',
    description:
      'Explorez les marchés prédictifs sur des événements réels avec WindMarket. Consultez les probabilités et découvrez les règles et le règlement des marchés.',
    ogLocale: 'fr_FR',
  },
  ja: {
    community: 'WindMarket コミュニティ',
    communityDetail: '市場について話す · 入金サポート',
    join: '参加する',
    depositSupport: '入金サポート',
    depositSupportDetail: 'サポートに問い合わせ · Telegram',
    title: 'WindMarket | 現実の出来事を対象とした予測市場',
    description:
      'WindMarket で現実の出来事を対象とした予測市場を探しましょう。市場の確率を確認し、イベントのルールや決済方法について知ることができます。',
    ogLocale: 'ja_JP',
  },
  ar: {
    community: 'مجتمع WindMarket',
    communityDetail: 'ناقش الأسواق · مساعدة في الإيداع',
    join: 'انضم للمجتمع',
    depositSupport: 'مساعدة في الإيداع',
    depositSupportDetail: 'تواصل مع الدعم · Telegram',
    title: 'WindMarket | أسواق التوقعات للأحداث الواقعية',
    description:
      'استكشف أسواق التوقعات للأحداث الواقعية على WindMarket. اطّلع على احتمالات السوق وتعرّف على قواعد الأحداث وآلية التسوية.',
    ogLocale: 'ar_SA',
  },
  ru: {
    community: 'Сообщество WindMarket',
    communityDetail: 'Обсуждение рынков · Помощь с пополнением',
    join: 'Присоединиться',
    depositSupport: 'Помощь с пополнением',
    depositSupportDetail: 'Связаться с поддержкой · Telegram',
    title: 'WindMarket | Рынки прогнозов на реальные события',
    description:
      'Изучайте рынки прогнозов на реальные события на WindMarket. Просматривайте рыночные вероятности и узнавайте правила событий и порядок расчётов.',
    ogLocale: 'ru_RU',
  },
  it: {
    community: 'Community WindMarket',
    communityDetail: 'Discussioni sui mercati · Assistenza depositi',
    join: 'Unisciti',
    depositSupport: 'Assistenza depositi',
    depositSupportDetail: 'Contatta il supporto · Telegram',
    title: 'WindMarket | Mercati di previsione su eventi reali',
    description:
      'Esplora i mercati di previsione su eventi reali su WindMarket. Consulta le probabilità di mercato e scopri le regole degli eventi e le modalità di liquidazione.',
    ogLocale: 'it_IT',
  },
  pl: {
    community: 'Społeczność WindMarket',
    communityDetail: 'Dyskusje o rynkach · Pomoc z wpłatami',
    join: 'Dołącz',
    depositSupport: 'Pomoc z wpłatami',
    depositSupportDetail: 'Skontaktuj się z pomocą · Telegram',
    title: 'WindMarket | Rynki prognostyczne dotyczące rzeczywistych wydarzeń',
    description:
      'Odkrywaj rynki prognostyczne dotyczące rzeczywistych wydarzeń na WindMarket. Sprawdzaj prawdopodobieństwa rynkowe, zasady wydarzeń i sposób rozliczania.',
    ogLocale: 'pl_PL',
  },
  ko: {
    community: 'WindMarket 커뮤니티',
    communityDetail: '시장 토론 · 입금 지원',
    join: '참여하기',
    depositSupport: '입금 지원',
    depositSupportDetail: '고객 지원 문의 · Telegram',
    title: 'WindMarket | 실제 사건을 위한 예측 시장',
    description:
      'WindMarket에서 실제 사건에 대한 예측 시장을 살펴보세요. 시장 확률을 확인하고 사건의 규칙과 정산 방식을 알아보세요.',
    ogLocale: 'ko_KR',
  },
}

export function getWindMarketCopy(locale: string) {
  return copy[resolveSupportedLocale(locale)]
}
