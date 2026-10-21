import type { SupportedLocale } from '@/i18n/locales'

import { resolveSupportedLocale } from '@/i18n/locales'

interface WindMarketCopy {
  directDepositNotice: {
    title: string
    tokenLabel: string
    networkLabel: string
    networkWarning: string
    assetWarning: string
    testTitle: string
    testWarning: string
    menuLabel: string
    testMenuLabel: string
  }
  inAppBrowserNotice: {
    title: string
    description: string
    dismiss: string
  }
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
    directDepositNotice: {
      title: 'Only USDC on Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Network',
      networkWarning: 'Do not send via Ethereum or any other network.',
      assetWarning: 'USDT and USDC.e are not supported. Incorrect transfers may be lost.',
      testTitle: 'Amoy test USDC only',
      testWarning: 'Test network only. Do not send real funds or use other networks.',
      menuLabel: 'Polygon USDC only',
      testMenuLabel: 'Amoy test USDC only',
    },
    inAppBrowserNotice: {
      title: 'Open in your browser',
      description:
        'For smoother sign-in and wallet connections, use the app menu to open this page in Chrome or Safari.',
      dismiss: 'Dismiss browser reminder',
    },
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
    directDepositNotice: {
      title: '僅接受 Polygon 網路的 USDC',
      tokenLabel: '幣種',
      networkLabel: '轉帳網路',
      networkWarning: '請勿透過以太坊（Ethereum）或其他網路轉入。',
      assetWarning: '不支援 USDT、USDC.e 等其他幣種。轉錯可能無法入帳或找回。',
      testTitle: '僅接受 Amoy 測試 USDC',
      testWarning: '此為測試網路，請勿轉入真實資金或透過其他網路轉入。',
      menuLabel: '僅限 Polygon 網路 USDC',
      testMenuLabel: '僅限 Amoy 測試 USDC',
    },
    inAppBrowserNotice: {
      title: '建議在瀏覽器中開啟',
      description: '為便於登入和連接錢包，請透過目前應用程式的選單，用 Chrome 或 Safari 開啟此頁面。',
      dismiss: '關閉瀏覽器提醒',
    },
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
    directDepositNotice: {
      title: '仅接受 Polygon 网络的 USDC',
      tokenLabel: '币种',
      networkLabel: '转账网络',
      networkWarning: '请勿通过以太坊（Ethereum）或其他网络转入。',
      assetWarning: '不支持 USDT、USDC.e 等其他币种。转错可能无法到账或找回。',
      testTitle: '仅接受 Amoy 测试 USDC',
      testWarning: '此为测试网络，请勿转入真实资金或通过其他网络转入。',
      menuLabel: '仅限 Polygon 网络 USDC',
      testMenuLabel: '仅限 Amoy 测试 USDC',
    },
    inAppBrowserNotice: {
      title: '建议在浏览器中打开',
      description: '为便于登录和连接钱包，请通过当前应用的菜单，用 Chrome 或 Safari 打开此页面。',
      dismiss: '关闭浏览器提醒',
    },
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
    directDepositNotice: {
      title: 'Nur USDC auf Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Netzwerk',
      networkWarning: 'Nicht über Ethereum oder andere Netzwerke senden.',
      assetWarning: 'USDT und USDC.e werden nicht unterstützt. Fehlerhafte Überweisungen können verloren gehen.',
      testTitle: 'Nur Amoy-Test-USDC',
      testWarning: 'Nur Testnetzwerk. Kein echtes Guthaben senden und keine anderen Netzwerke verwenden.',
      menuLabel: 'Nur Polygon-USDC',
      testMenuLabel: 'Nur Amoy-Test-USDC',
    },
    inAppBrowserNotice: {
      title: 'Im Browser öffnen',
      description:
        'Öffne diese Seite über das App-Menü in Chrome oder Safari, damit Anmeldung und Wallet-Verbindung reibungsloser funktionieren.',
      dismiss: 'Browser-Hinweis schließen',
    },
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
    directDepositNotice: {
      title: 'Solo USDC en Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Red',
      networkWarning: 'No envíes por Ethereum ni por otras redes.',
      assetWarning: 'USDT y USDC.e no son compatibles. Las transferencias incorrectas podrían perderse.',
      testTitle: 'Solo USDC de prueba en Amoy',
      testWarning: 'Solo red de prueba. No envíes fondos reales ni uses otras redes.',
      menuLabel: 'Solo USDC en Polygon',
      testMenuLabel: 'Solo USDC de prueba en Amoy',
    },
    inAppBrowserNotice: {
      title: 'Abrir en el navegador',
      description:
        'Para iniciar sesión y conectar tu billetera con mayor facilidad, abre esta página en Chrome o Safari desde el menú de la aplicación.',
      dismiss: 'Cerrar aviso del navegador',
    },
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
    directDepositNotice: {
      title: 'Apenas USDC na Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Rede',
      networkWarning: 'Não envie pela Ethereum nem por outras redes.',
      assetWarning: 'USDT e USDC.e não são aceitos. Transferências incorretas podem ser perdidas.',
      testTitle: 'Apenas USDC de teste na Amoy',
      testWarning: 'Apenas rede de teste. Não envie fundos reais nem use outras redes.',
      menuLabel: 'Apenas USDC na Polygon',
      testMenuLabel: 'Apenas USDC de teste na Amoy',
    },
    inAppBrowserNotice: {
      title: 'Abrir no navegador',
      description:
        'Para facilitar o login e a conexão da carteira, abra esta página no Chrome ou Safari pelo menu do aplicativo.',
      dismiss: 'Fechar aviso do navegador',
    },
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
    directDepositNotice: {
      title: 'USDC sur Polygon uniquement',
      tokenLabel: 'Jeton',
      networkLabel: 'Réseau',
      networkWarning: 'Ne pas envoyer via Ethereum ou un autre réseau.',
      assetWarning: 'USDT et USDC.e ne sont pas pris en charge. Les transferts incorrects peuvent être perdus.',
      testTitle: 'USDC de test sur Amoy uniquement',
      testWarning: 'Réseau de test uniquement. Ne pas envoyer de fonds réels ni utiliser un autre réseau.',
      menuLabel: 'USDC sur Polygon uniquement',
      testMenuLabel: 'USDC de test sur Amoy uniquement',
    },
    inAppBrowserNotice: {
      title: 'Ouvrir dans le navigateur',
      description:
        'Pour faciliter la connexion à votre compte et à votre portefeuille, ouvrez cette page dans Chrome ou Safari depuis le menu de l’application.',
      dismiss: 'Fermer le rappel du navigateur',
    },
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
    directDepositNotice: {
      title: 'Polygon 上の USDC のみ対応',
      tokenLabel: 'トークン',
      networkLabel: 'ネットワーク',
      networkWarning: 'Ethereum や他のネットワークから送金しないでください。',
      assetWarning: 'USDT・USDC.e には対応していません。誤送金した資金は失われる可能性があります。',
      testTitle: 'Amoy のテスト USDC のみ対応',
      testWarning: 'テストネット専用です。実際の資金を送ったり、他のネットワークを使用したりしないでください。',
      menuLabel: 'Polygon の USDC のみ',
      testMenuLabel: 'Amoy のテスト USDC のみ',
    },
    inAppBrowserNotice: {
      title: 'ブラウザで開くことをおすすめします',
      description:
        'ログインやウォレット接続をスムーズに行うため、アプリのメニューからこのページを Chrome または Safari で開いてください。',
      dismiss: 'ブラウザの案内を閉じる',
    },
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
    directDepositNotice: {
      title: 'USDC على شبكة Polygon فقط',
      tokenLabel: 'العملة',
      networkLabel: 'الشبكة',
      networkWarning: 'لا ترسل عبر Ethereum أو أي شبكة أخرى.',
      assetWarning: 'لا ندعم USDT أو USDC.e. قد تُفقد الأموال المحوّلة بشكل خاطئ.',
      testTitle: 'USDC التجريبي على Amoy فقط',
      testWarning: 'شبكة اختبار فقط. لا ترسل أموالًا حقيقية ولا تستخدم شبكات أخرى.',
      menuLabel: 'USDC على Polygon فقط',
      testMenuLabel: 'USDC التجريبي على Amoy فقط',
    },
    inAppBrowserNotice: {
      title: 'افتح الصفحة في متصفحك',
      description: 'لتسهيل تسجيل الدخول وربط المحفظة، افتح هذه الصفحة في Chrome أو Safari من قائمة التطبيق.',
      dismiss: 'إغلاق تذكير المتصفح',
    },
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
    directDepositNotice: {
      title: 'Только USDC в сети Polygon',
      tokenLabel: 'Токен',
      networkLabel: 'Сеть',
      networkWarning: 'Не отправляйте через Ethereum или другие сети.',
      assetWarning: 'USDT и USDC.e не поддерживаются. Ошибочные переводы могут быть потеряны.',
      testTitle: 'Только тестовые USDC в сети Amoy',
      testWarning: 'Только тестовая сеть. Не отправляйте реальные средства и не используйте другие сети.',
      menuLabel: 'Только USDC в сети Polygon',
      testMenuLabel: 'Только тестовые USDC в Amoy',
    },
    inAppBrowserNotice: {
      title: 'Откройте в браузере',
      description:
        'Для удобного входа и подключения кошелька откройте эту страницу в Chrome или Safari через меню приложения.',
      dismiss: 'Закрыть напоминание о браузере',
    },
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
    directDepositNotice: {
      title: 'Solo USDC su Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Rete',
      networkWarning: 'Non inviare tramite Ethereum o altre reti.',
      assetWarning: 'USDT e USDC.e non sono supportati. I trasferimenti errati potrebbero andare persi.',
      testTitle: 'Solo USDC di test su Amoy',
      testWarning: 'Solo rete di test. Non inviare fondi reali e non usare altre reti.',
      menuLabel: 'Solo USDC su Polygon',
      testMenuLabel: 'Solo USDC di test su Amoy',
    },
    inAppBrowserNotice: {
      title: 'Apri nel browser',
      description:
        'Per facilitare l’accesso e il collegamento del wallet, apri questa pagina in Chrome o Safari dal menu dell’app.',
      dismiss: 'Chiudi il promemoria del browser',
    },
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
    directDepositNotice: {
      title: 'Tylko USDC w sieci Polygon',
      tokenLabel: 'Token',
      networkLabel: 'Sieć',
      networkWarning: 'Nie wysyłaj przez Ethereum ani inne sieci.',
      assetWarning: 'USDT i USDC.e nie są obsługiwane. Błędne przelewy mogą skutkować utratą środków.',
      testTitle: 'Tylko testowe USDC w sieci Amoy',
      testWarning: 'Tylko sieć testowa. Nie wysyłaj prawdziwych środków ani nie używaj innych sieci.',
      menuLabel: 'Tylko USDC w sieci Polygon',
      testMenuLabel: 'Tylko testowe USDC w Amoy',
    },
    inAppBrowserNotice: {
      title: 'Otwórz w przeglądarce',
      description:
        'Aby ułatwić logowanie i łączenie portfela, otwórz tę stronę w Chrome lub Safari przez menu aplikacji.',
      dismiss: 'Zamknij przypomnienie o przeglądarce',
    },
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
    directDepositNotice: {
      title: 'Polygon 네트워크의 USDC만 지원',
      tokenLabel: '토큰',
      networkLabel: '네트워크',
      networkWarning: 'Ethereum이나 다른 네트워크로 보내지 마세요.',
      assetWarning: 'USDT와 USDC.e는 지원하지 않습니다. 잘못 송금하면 자금을 잃을 수 있습니다.',
      testTitle: 'Amoy 테스트 USDC만 지원',
      testWarning: '테스트 네트워크 전용입니다. 실제 자금을 보내거나 다른 네트워크를 사용하지 마세요.',
      menuLabel: 'Polygon USDC만 지원',
      testMenuLabel: 'Amoy 테스트 USDC만 지원',
    },
    inAppBrowserNotice: {
      title: '브라우저에서 열기를 권장합니다',
      description: '원활한 로그인과 지갑 연결을 위해 앱 메뉴에서 이 페이지를 Chrome 또는 Safari로 열어 주세요.',
      dismiss: '브라우저 안내 닫기',
    },
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
