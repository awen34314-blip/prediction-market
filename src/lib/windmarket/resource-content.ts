import type { WindMarketResourceId, WindMarketResourceLocale } from '@/lib/windmarket/resources'

import { userGuideContent } from '@/lib/windmarket/user-guide-content'

interface ResourceSection {
  id: string
  heading: string
  paragraphs: string[]
  points?: string[]
  example?: { label: string; text: string }
  table?: { caption: string; headers: string[]; rows: string[][] }
  links?: { label: string; href: string }[]
}

export interface ResourceContent {
  intro: string
  takeaway: string
  sections: ResourceSection[]
}

// Editorial content is imported by the server-rendered resource pages, not the trading UI.
const content: Record<WindMarketResourceId, Record<WindMarketResourceLocale, ResourceContent>> = {
  ...userGuideContent,
  about: {
    'zh-hant': {
      intro:
        '風向市場（WindMarket）面向東南亞社區，打造多品類預測市場。市場類別涵蓋加密貨幣、股票、黃金及其他真實世界事件，並通過中英文指南，幫助讀者理解市場概率與判定規則。',
      takeaway: '先理解問題，再看概率。每個市場的具體規則，比標題更重要。',
      sections: [
        {
          id: 'purpose',
          heading: '把事件變成一個可以討論的問題',
          paragraphs: [
            '新聞討論常常停留在“我覺得會發生”。預測市場進一步明確：發生什麼、在什麼時間之前、用什麼來源判斷結果。參與者對不同結果的買賣形成市場價格，讓分散的判斷以一種可觀察的方式呈現。',
            '風向市場提供瀏覽事件、閱讀規則和查看市場價格的入口。價格反映參與者當下的判斷，也會受流動性、買賣價差和新信息影響；它不是對結果的保證。',
          ],
        },
        {
          id: 'market-scope',
          heading: '加密貨幣、股票、黃金等多品類市場',
          paragraphs: [
            '風向市場涵蓋加密貨幣、股票、黃金及其他真實世界事件。你可以按關注的類別瀏覽市場，瞭解不同事件的市場概率與交易規則。',
            '每個市場都有自己的問題、數據來源、時間區間和結算條件。BTC 專題中的 4 小時週期和價格來源僅適用於對應事件，股票、黃金等市場也需要分別閱讀各自的規則。',
          ],
          links: [{ label: '瀏覽所有已開放市場', href: '/' }],
        },
        {
          id: 'community',
          heading: '為什麼面向東南亞社區',
          paragraphs: [
            '東南亞讀者可能使用不同語言、生活在不同時區，也可能第一次接觸鏈上錢包。我們把這些實際閱讀與使用問題放進入門內容：如何把事件時間換算到本地、如何區分價格與概率、如何核對充值幣種和網絡。',
            '目前這套品牌介紹和入門指南提供完整中文與英文版本。你可以先閱讀指南，再根據自己的情況瞭解平臺。面向東南亞社區是內容與產品方向，具體地區的賬戶、交易和支付服務是否可用，以當前服務條款與頁面提示為準。',
          ],
        },
        {
          id: 'start',
          heading: '第一次來，可以從這裡開始',
          paragraphs: [
            '不需要先做交易決定。先學會讀懂一個市場，可以幫助你識別模糊的條件、理解費用，以及判斷頁面上的信息是否足夠。',
          ],
          points: [
            '讀入門指南，理解價格、買賣價差與最終結算。',
            '讀東南亞指南，核對時區、語言、充值資產和網絡。',
            '打開感興趣的市場，逐條查看判定條件、截止時間與結果來源。',
          ],
        },
        {
          id: 'platform',
          heading: '平臺與官方入口',
          paragraphs: [
            '風向市場使用 Kuest 白標基礎設施，提供自己的品牌界面和社區內容。具體市場、訂單、資產與結算信息，以平臺實際展示的規則和記錄為準。',
            '品牌官網 windmarket.top 用於瞭解 WindMarket 風向市場和閱讀科普博客；市場應用 app.windmarket.top 用於查看具體市場與規則。官方 Telegram 社區為 @WindMarketOfficial，可用於討論市場和獲取使用幫助。',
          ],
          links: [
            { label: '瞭解 WindMarket 風向市場：品牌官網', href: 'https://windmarket.top/zh' },
            { label: '閱讀平臺服務條款', href: '/tos' },
            { label: '充值指南', href: '/learn/deposits' },
            { label: '提現指南', href: '/learn/withdrawals' },
            { label: '費用說明', href: '/learn/fees' },
            { label: '結算與領取', href: '/learn/settlement' },
            { label: '官方 X：@WindMarketHQ', href: 'https://x.com/WindMarketHQ' },
            { label: '查看平臺使用文檔（英文）', href: '/docs' },
          ],
        },
      ],
    },
    zh: {
      intro:
        '风向市场（WindMarket）面向东南亚社区，打造多品类预测市场。市场类别涵盖加密货币、股票、黄金及其他真实世界事件，并通过中英文指南，帮助读者理解市场概率与判定规则。',
      takeaway: '先理解问题，再看概率。每个市场的具体规则，比标题更重要。',
      sections: [
        {
          id: 'purpose',
          heading: '把事件变成一个可以讨论的问题',
          paragraphs: [
            '新闻讨论常常停留在“我觉得会发生”。预测市场进一步明确：发生什么、在什么时间之前、用什么来源判断结果。参与者对不同结果的买卖形成市场价格，让分散的判断以一种可观察的方式呈现。',
            '风向市场提供浏览事件、阅读规则和查看市场价格的入口。价格反映参与者当下的判断，也会受流动性、买卖价差和新信息影响；它不是对结果的保证。',
          ],
        },
        {
          id: 'market-scope',
          heading: '加密货币、股票、黄金等多品类市场',
          paragraphs: [
            '风向市场涵盖加密货币、股票、黄金及其他真实世界事件。你可以按关注的类别浏览市场，了解不同事件的市场概率与交易规则。',
            '每个市场都有自己的问题、数据来源、时间区间和结算条件。BTC 专题中的 4 小时周期和价格来源仅适用于对应事件，股票、黄金等市场也需要分别阅读各自的规则。',
          ],
          links: [{ label: '浏览所有已开放市场', href: '/' }],
        },
        {
          id: 'community',
          heading: '为什么面向东南亚社区',
          paragraphs: [
            '东南亚读者可能使用不同语言、生活在不同时区，也可能第一次接触链上钱包。我们把这些实际阅读与使用问题放进入门内容：如何把事件时间换算到本地、如何区分价格与概率、如何核对充值币种和网络。',
            '目前这套品牌介绍和入门指南提供完整中文与英文版本。你可以先阅读指南，再根据自己的情况了解平台。面向东南亚社区是内容与产品方向，具体地区的账户、交易和支付服务是否可用，以当前服务条款与页面提示为准。',
          ],
        },
        {
          id: 'start',
          heading: '第一次来，可以从这里开始',
          paragraphs: [
            '不需要先做交易决定。先学会读懂一个市场，可以帮助你识别模糊的条件、理解费用，以及判断页面上的信息是否足够。',
          ],
          points: [
            '读入门指南，理解价格、买卖价差与最终结算。',
            '读东南亚指南，核对时区、语言、充值资产和网络。',
            '打开感兴趣的市场，逐条查看判定条件、截止时间与结果来源。',
          ],
        },
        {
          id: 'platform',
          heading: '平台与官方入口',
          paragraphs: [
            '风向市场使用 Kuest 白标基础设施，提供自己的品牌界面和社区内容。具体市场、订单、资产与结算信息，以平台实际展示的规则和记录为准。',
            '品牌官网 windmarket.top 用于了解 WindMarket 风向市场和阅读科普博客；市场应用 app.windmarket.top 用于查看具体市场与规则。官方 Telegram 社区为 @WindMarketOfficial，可用于讨论市场和获取使用帮助。',
          ],
          links: [
            { label: '了解 WindMarket 风向市场：品牌官网', href: 'https://windmarket.top/zh' },
            { label: '阅读平台服务条款', href: '/tos' },
            { label: '充值指南', href: '/learn/deposits' },
            { label: '提现指南', href: '/learn/withdrawals' },
            { label: '费用说明', href: '/learn/fees' },
            { label: '结算与领取', href: '/learn/settlement' },
            { label: '官方 X：@WindMarketHQ', href: 'https://x.com/WindMarketHQ' },
            { label: '查看平台使用文档（英文）', href: '/docs' },
          ],
        },
      ],
    },
    en: {
      intro:
        'WindMarket is a multi-category prediction market platform for Southeast Asian communities. Our markets cover crypto, stocks, gold and other real-world events, with English and Chinese guides that explain market probabilities and rules.',
      takeaway:
        'Understand the question before reading the probability. The detailed rules matter more than the headline.',
      sections: [
        {
          id: 'purpose',
          heading: 'Turn an event into a clear question',
          paragraphs: [
            'A discussion often starts with “I think this will happen.” A prediction market makes the question more precise: what must happen, by when, and which source determines the result? Buying and selling different outcomes gives participants a way to express their views through observable market prices.',
            'WindMarket provides a place to browse events, read their rules and view prices. Those prices reflect current participant views, but also respond to liquidity, bid–ask spreads and new information. They are not guarantees about the outcome.',
          ],
        },
        {
          id: 'market-scope',
          heading: 'Crypto, stocks, gold and more',
          paragraphs: [
            'WindMarket covers crypto, stocks, gold and other real-world events. Browse the categories you follow to explore market probabilities and trading rules.',
            'Each market has its own question, data source, time window and settlement conditions. The four-hour format and price source in our BTC guide apply to the corresponding event. Stock and gold markets also have their own rules to read.',
          ],
          links: [{ label: 'Browse all available markets', href: '/' }],
        },
        {
          id: 'community',
          heading: 'Why Southeast Asian communities',
          paragraphs: [
            'Readers across Southeast Asia use different languages and time zones, and may be new to on-chain wallets. Our introductory content addresses these practical questions: converting an event deadline to local time, interpreting a quoted probability, and checking the asset and network for a deposit.',
            'These introductory guides and brand pages are available in full in English and Chinese. Start with the material that suits you and then check the platform for your circumstances. Southeast Asia is our community and content focus; account, trading and payment availability in a particular location is governed by current terms and the information shown in the platform.',
          ],
        },
        {
          id: 'start',
          heading: 'A useful first visit',
          paragraphs: [
            'You can begin by learning how to read a market. Understanding the details helps you spot unclear conditions, account for fees and decide whether you have enough information.',
          ],
          points: [
            'Read the beginner guide to understand prices, spreads and settlement.',
            'Use the Southeast Asia guide to check time zones, language, deposit assets and networks.',
            'Open a market and read its conditions, deadline and resolution source in full.',
          ],
        },
        {
          id: 'platform',
          heading: 'Platform and official links',
          paragraphs: [
            'WindMarket uses Kuest white-label infrastructure with its own brand interface and community content. Refer to the platform’s actual rules and records for market, order, asset and settlement details.',
            'Visit windmarket.top for the WindMarket brand website and educational blog, and app.windmarket.top to inspect individual markets and their rules. Our official Telegram community, @WindMarketOfficial, is a place for market discussion and help using the platform.',
          ],
          links: [
            { label: 'Meet WindMarket on our official website', href: 'https://windmarket.top/' },
            { label: 'Read the platform terms', href: '/tos' },
            { label: 'Deposit guide', href: '/learn/deposits' },
            { label: 'Withdrawal guide', href: '/learn/withdrawals' },
            { label: 'Fees explained', href: '/learn/fees' },
            { label: 'Settlement and claims', href: '/learn/settlement' },
            { label: 'Official X: @WindMarketHQ', href: 'https://x.com/WindMarketHQ' },
            { label: 'Explore the platform documentation', href: '/docs' },
          ],
        },
      ],
    },
  },
  'prediction-markets': {
    'zh-hant': {
      intro:
        '預測市場圍繞一個有明確判定條件的未來事件，讓參與者買賣不同結果的份額。入門的關鍵是同時理解問題、價格和規則，而不是隻看一個百分比。',
      takeaway: '屏幕上的概率、實際成交價格、最終結算結果，是三個不同的信息。',
      sections: [
        {
          id: 'question',
          heading: '1. 一個市場到底在問什麼',
          paragraphs: [
            '二元市場通常只有兩個結果，例如“是”和“否”，或“上漲”和“下跌”。多結果市場會列出多個選項。標題方便瀏覽，完整規則則決定什麼情況算作某個結果。',
            '先確認事件對象、比較基準、觀察區間和結果來源。例如“價格會上漲嗎”並不完整，還需要知道比較哪個起始價格、在哪一刻觀察、使用哪個數據源。這些都應從該市場的規則中核對。',
          ],
        },
        {
          id: 'price',
          heading: '2. 價格為什麼經常顯示為概率',
          paragraphs: [
            '在通常的二元市場中，最終獲勝的一份份額按 1 美元結算，失敗的一份按 0 美元結算。因此，0.60 美元的份額價格常被解讀為約 60% 的隱含概率。這是一種讀懂市場報價的方法，並非統計學上已被證實的成功率。',
            '頁面展示的概率可能來自最近成交價、中間價或其他報價方式。訂單能否成交、實際成本是多少，還要看當時可成交的訂單和費用。特殊、取消或爭議情形應按對應市場的規則處理。',
          ],
          example: {
            label: '僅用於理解的假設示例',
            text: '假設以每份 0.60 美元買入 10 份“是”，成本為 6 美元。若“是”最終獲勝，結算價值為 10 美元；若失敗，結算價值為 0。該示例不計手續費，也不代表任何當前市場、收益承諾或交易建議。',
          },
        },
        {
          id: 'execution',
          heading: '3. 買入價和賣出價為什麼不一樣',
          paragraphs: [
            '訂單簿裡，買方願意支付的最高價格稱為買價，賣方願意接受的最低價格稱為賣價。兩者之間的差額是買賣價差。立即買入通常需要匹配賣方訂單，立即賣出通常需要匹配買方訂單。',
            '某一價格上可成交的數量有限。訂單較大時，可能匹配多個價格，實際平均成交價會與最先看到的價格不同。限價單可以限定可接受的價格，但不保證成交。提交前查看訂單預覽中的數量、價格與費用。',
          ],
          links: [
            { label: '價格說明（英文）', href: '/docs/exploring-markets/understanding-prices' },
            { label: '訂單類型（英文）', href: '/docs/exploring-markets/order-types' },
          ],
        },
        {
          id: 'resolution',
          heading: '4. 截止時間不等於結算完成',
          paragraphs: [
            '交易截止、事件結束、結果確認和資產結算可能發生在不同時間。某個事件已結束，並不意味著結果已經確認或餘額已經可以使用。',
            '市場會依據寫明的判定條件與結果來源進行處理。查看事件頁面的狀態與規則，瞭解何時停止交易、如何確定結果，以及存在爭議時的處理方式。',
          ],
          links: [{ label: '結果確認與結算文檔（英文）', href: '/docs/resolution-settlement/market-resolution' }],
        },
        {
          id: 'check',
          heading: '5. 使用前核對這幾項',
          paragraphs: ['信息不完整時，先閱讀規則或通過官方社區諮詢。理解市場並不要求你立刻充值或下單。'],
          points: [
            '資格與地區：查看當前服務條款及賬戶提示。',
            '費用與成交：以訂單預覽和最終成交記錄為準，價差也會影響成本。',
            '充值資產與網絡：逐項核對充值頁面，USDT 與 USDC、TRON 與 Polygon 都不是同一項。',
            '風險：結果判斷錯誤時，相關份額可能損失全部價值。',
          ],
          links: [
            { label: '交易費用文檔（英文）', href: '/docs/fees-limits/trading-fees' },
            { label: '充值使用文檔（英文）', href: '/docs/getting-started/how-to-deposit' },
          ],
        },
      ],
    },
    zh: {
      intro:
        '预测市场围绕一个有明确判定条件的未来事件，让参与者买卖不同结果的份额。入门的关键是同时理解问题、价格和规则，而不是只看一个百分比。',
      takeaway: '屏幕上的概率、实际成交价格、最终结算结果，是三个不同的信息。',
      sections: [
        {
          id: 'question',
          heading: '1. 一个市场到底在问什么',
          paragraphs: [
            '二元市场通常只有两个结果，例如“是”和“否”，或“上涨”和“下跌”。多结果市场会列出多个选项。标题方便浏览，完整规则则决定什么情况算作某个结果。',
            '先确认事件对象、比较基准、观察区间和结果来源。例如“价格会上涨吗”并不完整，还需要知道比较哪个起始价格、在哪一刻观察、使用哪个数据源。这些都应从该市场的规则中核对。',
          ],
        },
        {
          id: 'price',
          heading: '2. 价格为什么经常显示为概率',
          paragraphs: [
            '在通常的二元市场中，最终获胜的一份份额按 1 美元结算，失败的一份按 0 美元结算。因此，0.60 美元的份额价格常被解读为约 60% 的隐含概率。这是一种读懂市场报价的方法，并非统计学上已被证实的成功率。',
            '页面展示的概率可能来自最近成交价、中间价或其他报价方式。订单能否成交、实际成本是多少，还要看当时可成交的订单和费用。特殊、取消或争议情形应按对应市场的规则处理。',
          ],
          example: {
            label: '仅用于理解的假设示例',
            text: '假设以每份 0.60 美元买入 10 份“是”，成本为 6 美元。若“是”最终获胜，结算价值为 10 美元；若失败，结算价值为 0。该示例不计手续费，也不代表任何当前市场、收益承诺或交易建议。',
          },
        },
        {
          id: 'execution',
          heading: '3. 买入价和卖出价为什么不一样',
          paragraphs: [
            '订单簿里，买方愿意支付的最高价格称为买价，卖方愿意接受的最低价格称为卖价。两者之间的差额是买卖价差。立即买入通常需要匹配卖方订单，立即卖出通常需要匹配买方订单。',
            '某一价格上可成交的数量有限。订单较大时，可能匹配多个价格，实际平均成交价会与最先看到的价格不同。限价单可以限定可接受的价格，但不保证成交。提交前查看订单预览中的数量、价格与费用。',
          ],
          links: [
            { label: '价格说明（英文）', href: '/docs/exploring-markets/understanding-prices' },
            { label: '订单类型（英文）', href: '/docs/exploring-markets/order-types' },
          ],
        },
        {
          id: 'resolution',
          heading: '4. 截止时间不等于结算完成',
          paragraphs: [
            '交易截止、事件结束、结果确认和资产结算可能发生在不同时间。某个事件已结束，并不意味着结果已经确认或余额已经可以使用。',
            '市场会依据写明的判定条件与结果来源进行处理。查看事件页面的状态与规则，了解何时停止交易、如何确定结果，以及存在争议时的处理方式。',
          ],
          links: [{ label: '结果确认与结算文档（英文）', href: '/docs/resolution-settlement/market-resolution' }],
        },
        {
          id: 'check',
          heading: '5. 使用前核对这几项',
          paragraphs: ['信息不完整时，先阅读规则或通过官方社区咨询。理解市场并不要求你立刻充值或下单。'],
          points: [
            '资格与地区：查看当前服务条款及账户提示。',
            '费用与成交：以订单预览和最终成交记录为准，价差也会影响成本。',
            '充值资产与网络：逐项核对充值页面，USDT 与 USDC、TRON 与 Polygon 都不是同一项。',
            '风险：结果判断错误时，相关份额可能损失全部价值。',
          ],
          links: [
            { label: '交易费用文档（英文）', href: '/docs/fees-limits/trading-fees' },
            { label: '充值使用文档（英文）', href: '/docs/getting-started/how-to-deposit' },
          ],
        },
      ],
    },
    en: {
      intro:
        'A prediction market lets participants buy and sell shares in the possible outcomes of a clearly defined event. Getting started means understanding the question, the price and the rules together, rather than reading a percentage in isolation.',
      takeaway:
        'The displayed probability, your execution price and the final settlement result are three different pieces of information.',
      sections: [
        {
          id: 'question',
          heading: '1. What is the market asking?',
          paragraphs: [
            'A binary market usually has two outcomes, such as Yes and No, or Up and Down. Other markets list several possible outcomes. The headline makes a market easy to browse; the detailed rules determine what counts as a particular result.',
            'Check the subject, comparison baseline, observation period and resolution source. “Will the price rise?” needs more detail: which starting price, which observation time and which data source? Find these specifics in the market’s rules.',
          ],
        },
        {
          id: 'price',
          heading: '2. Why prices are read as probabilities',
          paragraphs: [
            'In a typical binary market, a winning share settles at $1 and a losing share at $0. A share priced at $0.60 is therefore often interpreted as an implied probability of about 60%. This is a way of reading the quote, not a statistically verified success rate.',
            'A displayed probability may be based on a last trade, midpoint or another quoting method. Whether your order fills and what it costs depend on available orders and fees. Special, cancelled or disputed outcomes follow the rules of the particular market.',
          ],
          example: {
            label: 'An illustrative example only',
            text: 'Suppose you buy 10 Yes shares at $0.60 each, costing $6. If Yes wins, their settlement value is $10; if it loses, their settlement value is $0. This example excludes fees and does not describe a current market, promise a return or recommend a trade.',
          },
        },
        {
          id: 'execution',
          heading: '3. Why buying and selling prices differ',
          paragraphs: [
            'In an order book, the bid is the highest price a buyer is offering and the ask is the lowest price a seller is accepting. The difference is the bid–ask spread. An immediate purchase normally matches sell orders; an immediate sale normally matches buy orders.',
            'Only a certain number of shares may be available at one price. A larger order can match several price levels, so its average execution price may differ from the first quote you saw. A limit order sets an acceptable price but does not guarantee a fill. Review the quantity, price and fees before submitting.',
          ],
          links: [
            { label: 'Understanding prices', href: '/docs/exploring-markets/understanding-prices' },
            { label: 'Order types explained', href: '/docs/exploring-markets/order-types' },
          ],
        },
        {
          id: 'resolution',
          heading: '4. A deadline is not completed settlement',
          paragraphs: [
            'Trading closure, the end of an event, confirmation of its result and asset settlement can happen at different times. An event having ended does not mean its result has been confirmed or its proceeds are available.',
            'The market follows its stated resolution conditions and sources. Read the event status and rules to understand when trading ends, how the result is determined and how disputes are handled.',
          ],
          links: [{ label: 'Market resolution and settlement', href: '/docs/resolution-settlement/market-resolution' }],
        },
        {
          id: 'check',
          heading: '5. What to check before using a market',
          paragraphs: [
            'If information is missing, read the rules or ask in the official community. Learning how a market works does not require an immediate deposit or order.',
          ],
          points: [
            'Eligibility and location: check the current terms and account notices.',
            'Fees and execution: use the order preview and final fill records; spreads also affect cost.',
            'Deposit asset and network: check every field. USDT and USDC differ, as do TRON and Polygon.',
            'Risk: shares in a losing outcome can lose their entire value.',
          ],
          links: [
            { label: 'Trading fees', href: '/docs/fees-limits/trading-fees' },
            { label: 'Deposit documentation', href: '/docs/getting-started/how-to-deposit' },
          ],
        },
      ],
    },
  },
  'southeast-asia': {
    'zh-hant': {
      intro:
        '同一個全球事件，在馬尼拉可能已是晚上，在曼谷卻還早一個小時。這份指南從時區、語言與充值信息出發，幫助東南亞讀者更準確地理解預測市場。',
      takeaway: '先核對時間、判定來源、幣種與網絡，再考慮下一步。',
      sections: [
        {
          id: 'timezones',
          heading: '把事件時間換算成自己的本地時間',
          paragraphs: [
            '市場標題或規則可能使用 UTC，也可能使用 ET 等當地時間。先找到原始時區，再轉換到自己的城市；不要只根據日期或“上午、下午”判斷截止時間。',
            '下表以同一天 12:00 UTC 為例。印尼有三個時區，雅加達與巴厘島並不是同一時間。美國東部時間 ET 會隨夏令時變化，不能全年固定按一個偏移量換算。',
          ],
          table: {
            caption: '示例：當 UTC 時間為 12:00',
            headers: ['城市 / 地區', '時區', '本地時間'],
            rows: [
              ['菲律賓 · 馬尼拉', 'UTC+8', '20:00'],
              ['新加坡', 'UTC+8', '20:00'],
              ['馬來西亞 · 吉隆坡', 'UTC+8', '20:00'],
              ['泰國 · 曼谷', 'UTC+7', '19:00'],
              ['越南 · 胡志明市', 'UTC+7', '19:00'],
              ['印尼 · 雅加達', 'UTC+7', '19:00'],
              ['印尼 · 巴厘島', 'UTC+8', '20:00'],
              ['印尼 · 查亞普拉', 'UTC+9', '21:00'],
            ],
          },
        },
        {
          id: 'language',
          heading: '中文與英文：讀懂規則比翻譯標題更重要',
          paragraphs: [
            '風向市場的這套入門內容有中文與英文版本。遇到事件標題、來源報道和結算規則語言不同的情況，應逐項核對人物、地點、數值、日期，以及“之前”“達到”“高於”等關鍵條件。',
            '界面語言切換不會改變市場的實際判定條件。如果譯文和原始來源看起來有差異，先查看該市場的完整規則及指定來源，再向官方支持核實。',
          ],
        },
        {
          id: 'deposits',
          heading: '充值要同時核對幣種、網絡和到賬資產',
          paragraphs: [
            '錢包或交易所裡持有 USDT，並不代表可以把它直接轉到任何充值地址。USDT 與 USDC 是不同資產，同一種資產也可能存在於不同區塊鏈上。TRC20 通常指 TRON 上的代幣標準；Polygon 是另一條網絡。',
            '如果充值頁面顯示接收 Polygon USDC，就應按照該頁面指定的資產、網絡和地址操作。需要兌換或跨鏈時，查看當前實際提供的充值選項，以及報價中的費用、最低金額、預期到賬資產和時間。不要把 TRON 上的 USDT 直接發送到 Polygon USDC 充值地址。',
            '銀行卡、本地貨幣或其他支付方式是否顯示，可能取決於地區、服務商和身份驗證要求。某個國家的貨幣或支付工具出現在介紹材料裡，不等於你的賬戶一定能夠使用；以實際充值頁面為準。',
          ],
          links: [{ label: '查看充值文檔（英文）', href: '/docs/getting-started/how-to-deposit' }],
        },
        {
          id: 'availability',
          heading: '社區方向與地區服務可用性',
          paragraphs: [
            '我們面向東南亞社區提供預測市場內容，但不同地區的賬戶、交易和支付服務可能有不同限制。這份時區與閱讀指南不是某個國家的服務開放清單，也不代表當地許可或支付方式的承諾。',
            '使用前查看當前服務條款、頁面地區提示和所選支付服務商的要求。如果頁面顯示某項服務不可用，通過官方支持瞭解原因；不要依據其他地區用戶的操作截圖判斷自己的可用性。',
          ],
          links: [{ label: '查看服務條款', href: '/tos' }],
        },
        {
          id: 'reading',
          heading: '建立自己的市場閱讀順序',
          paragraphs: [
            '無論關注加密貨幣、股票、黃金、全球新聞還是體育相關事件，都可以用同一套順序檢查頁面。選擇你關注的類別，再查看對應事件的具體規則。',
          ],
          points: [
            '問題：這個市場如何定義“發生”或“未發生”？',
            '時間：觀察時間和交易截止時間是什麼，換算到本地是幾點？',
            '證據：使用哪個來源確認結果？',
            '價格：顯示概率與實際可成交價格有什麼差別？',
            '成本與狀態：訂單預覽有哪些費用，市場是交易中、等待結果還是已結算？',
          ],
        },
      ],
    },
    zh: {
      intro:
        '同一个全球事件，在马尼拉可能已是晚上，在曼谷却还早一个小时。这份指南从时区、语言与充值信息出发，帮助东南亚读者更准确地理解预测市场。',
      takeaway: '先核对时间、判定来源、币种与网络，再考虑下一步。',
      sections: [
        {
          id: 'timezones',
          heading: '把事件时间换算成自己的本地时间',
          paragraphs: [
            '市场标题或规则可能使用 UTC，也可能使用 ET 等当地时间。先找到原始时区，再转换到自己的城市；不要只根据日期或“上午、下午”判断截止时间。',
            '下表以同一天 12:00 UTC 为例。印尼有三个时区，雅加达与巴厘岛并不是同一时间。美国东部时间 ET 会随夏令时变化，不能全年固定按一个偏移量换算。',
          ],
          table: {
            caption: '示例：当 UTC 时间为 12:00',
            headers: ['城市 / 地区', '时区', '本地时间'],
            rows: [
              ['菲律宾 · 马尼拉', 'UTC+8', '20:00'],
              ['新加坡', 'UTC+8', '20:00'],
              ['马来西亚 · 吉隆坡', 'UTC+8', '20:00'],
              ['泰国 · 曼谷', 'UTC+7', '19:00'],
              ['越南 · 胡志明市', 'UTC+7', '19:00'],
              ['印尼 · 雅加达', 'UTC+7', '19:00'],
              ['印尼 · 巴厘岛', 'UTC+8', '20:00'],
              ['印尼 · 查亚普拉', 'UTC+9', '21:00'],
            ],
          },
        },
        {
          id: 'language',
          heading: '中文与英文：读懂规则比翻译标题更重要',
          paragraphs: [
            '风向市场的这套入门内容有中文与英文版本。遇到事件标题、来源报道和结算规则语言不同的情况，应逐项核对人物、地点、数值、日期，以及“之前”“达到”“高于”等关键条件。',
            '界面语言切换不会改变市场的实际判定条件。如果译文和原始来源看起来有差异，先查看该市场的完整规则及指定来源，再向官方支持核实。',
          ],
        },
        {
          id: 'deposits',
          heading: '充值要同时核对币种、网络和到账资产',
          paragraphs: [
            '钱包或交易所里持有 USDT，并不代表可以把它直接转到任何充值地址。USDT 与 USDC 是不同资产，同一种资产也可能存在于不同区块链上。TRC20 通常指 TRON 上的代币标准；Polygon 是另一条网络。',
            '如果充值页面显示接收 Polygon USDC，就应按照该页面指定的资产、网络和地址操作。需要兑换或跨链时，查看当前实际提供的充值选项，以及报价中的费用、最低金额、预期到账资产和时间。不要把 TRON 上的 USDT 直接发送到 Polygon USDC 充值地址。',
            '银行卡、本地货币或其他支付方式是否显示，可能取决于地区、服务商和身份验证要求。某个国家的货币或支付工具出现在介绍材料里，不等于你的账户一定能够使用；以实际充值页面为准。',
          ],
          links: [{ label: '查看充值文档（英文）', href: '/docs/getting-started/how-to-deposit' }],
        },
        {
          id: 'availability',
          heading: '社区方向与地区服务可用性',
          paragraphs: [
            '我们面向东南亚社区提供预测市场内容，但不同地区的账户、交易和支付服务可能有不同限制。这份时区与阅读指南不是某个国家的服务开放清单，也不代表当地许可或支付方式的承诺。',
            '使用前查看当前服务条款、页面地区提示和所选支付服务商的要求。如果页面显示某项服务不可用，通过官方支持了解原因；不要依据其他地区用户的操作截图判断自己的可用性。',
          ],
          links: [{ label: '查看服务条款', href: '/tos' }],
        },
        {
          id: 'reading',
          heading: '建立自己的市场阅读顺序',
          paragraphs: [
            '无论关注加密货币、股票、黄金、全球新闻还是体育相关事件，都可以用同一套顺序检查页面。选择你关注的类别，再查看对应事件的具体规则。',
          ],
          points: [
            '问题：这个市场如何定义“发生”或“未发生”？',
            '时间：观察时间和交易截止时间是什么，换算到本地是几点？',
            '证据：使用哪个来源确认结果？',
            '价格：显示概率与实际可成交价格有什么差别？',
            '成本与状态：订单预览有哪些费用，市场是交易中、等待结果还是已结算？',
          ],
        },
      ],
    },
    en: {
      intro:
        'The same global event can fall in the evening in Manila and an hour earlier in Bangkok. This guide covers time zones, language and deposit information to help Southeast Asian readers interpret prediction markets accurately.',
      takeaway: 'Check the time, resolution source, asset and network before deciding what to do next.',
      sections: [
        {
          id: 'timezones',
          heading: 'Convert the event time to your local time',
          paragraphs: [
            'A market title or rule may use UTC or a local time zone such as ET. Identify the original time zone before converting it to your city. A date or an AM/PM label alone is not enough to establish a deadline.',
            'The table uses 12:00 UTC on the same day as an example. Indonesia spans three time zones, so Jakarta and Bali are not on the same clock. US Eastern Time changes with daylight saving time; do not apply one fixed offset throughout the year.',
          ],
          table: {
            caption: 'Example: when it is 12:00 UTC',
            headers: ['City / location', 'Time zone', 'Local time'],
            rows: [
              ['Manila, Philippines', 'UTC+8', '20:00'],
              ['Singapore', 'UTC+8', '20:00'],
              ['Kuala Lumpur, Malaysia', 'UTC+8', '20:00'],
              ['Bangkok, Thailand', 'UTC+7', '19:00'],
              ['Ho Chi Minh City, Vietnam', 'UTC+7', '19:00'],
              ['Jakarta, Indonesia', 'UTC+7', '19:00'],
              ['Bali, Indonesia', 'UTC+8', '20:00'],
              ['Jayapura, Indonesia', 'UTC+9', '21:00'],
            ],
          },
        },
        {
          id: 'language',
          heading: 'Read the rules, not just a translated title',
          paragraphs: [
            'This set of WindMarket introductory guides is available in English and Chinese. When a headline, source report and resolution rule use different languages, check names, locations, numbers, dates and conditions such as “before,” “reaches” and “greater than.”',
            'Changing the interface language does not change the market’s resolution conditions. If a translation appears inconsistent with the original source, consult the full market rules and designated source, then ask official support for clarification.',
          ],
        },
        {
          id: 'deposits',
          heading: 'Check the asset, network and destination balance',
          paragraphs: [
            'Holding USDT in a wallet or exchange does not mean it can be sent directly to any deposit address. USDT and USDC are different assets, and the same asset may exist on multiple blockchains. TRC20 typically refers to a token standard on TRON; Polygon is a different network.',
            'If the deposit screen specifies Polygon USDC, follow its exact asset, network and address instructions. When conversion or bridging is needed, check the options actually offered and review fees, minimum amounts, the expected destination asset and processing time. Do not send USDT on TRON directly to a Polygon USDC deposit address.',
            'Card, local-currency and other payment options can depend on location, provider and identity verification requirements. A currency or payment method appearing in introductory material does not guarantee that your account can use it. Check the actual deposit screen.',
          ],
          links: [{ label: 'Read the deposit documentation', href: '/docs/getting-started/how-to-deposit' }],
        },
        {
          id: 'availability',
          heading: 'Community focus and service availability',
          paragraphs: [
            'WindMarket creates prediction market content for Southeast Asian communities, but account, trading and payment services may have different restrictions across locations. This time-zone and reading guide is not a list of supported countries or a claim of local licensing or payment support.',
            'Read the current terms, location notices and selected payment provider’s requirements before using a service. If the platform shows that an option is unavailable, ask official support about the reason. A screenshot from a user in another country does not establish availability for your account.',
          ],
          links: [{ label: 'Read the terms of use', href: '/tos' }],
        },
        {
          id: 'reading',
          heading: 'Build a consistent reading routine',
          paragraphs: [
            'Whether following crypto, stocks, gold, global news or sport-related events, you can use the same sequence to read a market. Choose the category you follow, then read the rules of the individual event.',
          ],
          points: [
            'Question: what exactly counts as the event happening or not happening?',
            'Time: when are the observation and trading deadlines in your local time?',
            'Evidence: which source confirms the result?',
            'Price: how does the displayed probability differ from an executable quote?',
            'Cost and status: what fees appear in the order preview, and is the market trading, awaiting a result or settled?',
          ],
        },
      ],
    },
  },
  'bitcoin-up-or-down': {
    en: {
      intro:
        'A Bitcoin Up or Down market asks a precise question about a defined time window. This guide explains 5-minute, 15-minute and 4-hour windows, separates the BTC reference price from outcome-share prices, and shows how to check settlement rules and local times. Available markets and their individual rules determine which windows can currently be traded.',
      takeaway:
        'The event title defines the time window. Rules & Resolution defines the price source and winning condition. Your purchase time does not reset either of them.',
      sections: [
        {
          id: 'window',
          heading: '1. How do 5-minute, 15-minute and 4-hour markets differ?',
          paragraphs: [
            'Labels such as “5m”, “15m” and “4h” describe fixed observation windows of five minutes, fifteen minutes and four hours. The start and end belong to the event, not the time you enter. Opening a 15-minute market two minutes before its deadline does not give you a new fifteen-minute window.',
            'Read the full date, start time, end time and time zone together. Different intervals or successive rounds are separate questions; check the selected event’s title again after navigating between them. The duration label alone does not tell you whether a market is currently open.',
          ],
        },
        {
          id: 'prices',
          heading: '2. Price To Beat is different from a share price',
          paragraphs: [
            'Price To Beat is the BTC reference baseline shown for the event. The current-price display tracks the reference market data. Up and Down shares have their own order-book prices, which represent what participants are offering or asking for those outcomes. Buying an Up share does not buy Bitcoin itself.',
            'A 60¢ Up quote is often read as an implied probability of about 60%, subject to the quoting method and available liquidity. It is not a forecast that Bitcoin will rise by 60%. The order preview and executable bids and asks determine the cost of an order.',
          ],
          example: {
            label: 'Illustrative numbers, not a live quote',
            text: 'A page might show a BTC baseline of $80,000 alongside an Up share priced at $0.60. The first number helps define the event’s comparison; the second is a price for one outcome share. They describe different things, so neither can be substituted for the other.',
          },
          links: [{ label: 'How prediction market prices work', href: '/learn/prediction-markets' }],
        },
        {
          id: 'source',
          heading: '3. Which Bitcoin price determines the outcome?',
          paragraphs: [
            'Open Rules & Resolution on the selected event. Check the named source, comparison method, observation times and how an exactly equal price is treated. A price moving above the baseline during the event is not, by itself, proof of the final result.',
            'For example, the WindMarket BTC market dated 19 September 2026, 4–8 PM ET, names a Chainlink BTC/USD TWAP data stream. TWAP means time-weighted average price. That rule refers to a specific price measure, rather than whichever spot exchange or chart a reader happens to be watching. The event window and a data stream’s averaging period are separate concepts.',
            'That example’s written comparison includes equality on the Up side. Read each event’s own rules before applying that condition elsewhere. If the averaging period or observation details are unclear, consult the named source and official support instead of inferring a formula from the “4h” label.',
          ],
          links: [{ label: 'Read the dated example’s Rules & Resolution', href: '/event/btc-updown-4h-1789848000' }],
        },
        {
          id: 'timezones',
          heading: '4. Read the event window in your local time',
          paragraphs: [
            'ET means US Eastern Time, which changes with daylight saving time. Use the event’s actual date when converting it. The example below is a hypothetical window on 21 September 2026; it is not an announcement of a live market or a recurring local schedule.',
            'For that date, 4–8 AM in New York is 08:00–12:00 UTC. All local times in this table fall on 21 September. A different event date or window can produce different offsets or cross midnight.',
          ],
          table: {
            caption: 'Example only: 21 September 2026, 4–8 AM ET',
            headers: ['City / location', 'Local observation window'],
            rows: [
              ['Manila, Philippines', '16:00–20:00'],
              ['Singapore', '16:00–20:00'],
              ['Kuala Lumpur, Malaysia', '16:00–20:00'],
              ['Bangkok, Thailand', '15:00–19:00'],
              ['Ho Chi Minh City, Vietnam', '15:00–19:00'],
              ['Jakarta, Indonesia', '15:00–19:00'],
              ['Bali, Indonesia', '16:00–20:00'],
            ],
          },
          links: [{ label: 'More Southeast Asia time-zone and language guidance', href: '/learn/southeast-asia' }],
        },
        {
          id: 'settlement',
          heading: '5. What happens when the countdown ends?',
          paragraphs: [
            'The observation window ending, a final price becoming available and the official result being recorded are different steps. A finished countdown or a chart label alone does not establish that shares are ready to redeem. Check the event’s resolution status and your position’s available actions.',
            'Under the platform’s standard binary settlement, a winning share redeems for $1 and a losing share for $0. Trading costs depend on your fill price and fees; an unresolved, cancelled or exceptional outcome follows its applicable rules. Selling before resolution also requires an available buyer and does not guarantee a particular exit price.',
          ],
          links: [
            {
              label: 'Official market resolution documentation',
              href: '/docs/resolution-settlement/market-resolution',
            },
          ],
        },
        {
          id: 'check',
          heading: 'A quick reading checklist',
          paragraphs: [
            'Use this order when reviewing a BTC event. The guide explains how to read the page; it does not predict the next move.',
          ],
          points: [
            'Confirm the event date, observation window and current status.',
            'Separate the BTC baseline from the Up and Down share quotes.',
            'Read the exact resolution source, comparison and equality rule.',
            'Convert the deadline using the correct date and time zone.',
            'Check executable prices, fees and the official result before relying on an expected payout.',
          ],
          links: [{ label: 'Browse all available markets', href: '/' }],
        },
      ],
    },
    'zh-hant': {
      intro:
        'BTC 漲跌預測市場圍繞一個有明確時間區間的問題展開。本指南說明 5 分鐘、15 分鐘與 4 小時週期的區別，區分比特幣參考價格和結果份額報價，並介紹如何核對結算規則與當地時間。當前可交易的週期，以實際開放市場及其各自規則為準。',
      takeaway: '事件標題確定觀察區間，“規則與結算”確定數據來源和獲勝條件。你的買入時間不會重新設置這兩項。',
      sections: [
        {
          id: 'window',
          heading: '1. 5 分鐘、15 分鐘與 4 小時市場有什麼區別？',
          paragraphs: [
            '“5m”“15m”“4h”分別表示固定的 5 分鐘、15 分鐘和 4 小時觀察區間。起止時間屬於事件本身，不會因為你何時買入而重新計時。例如，在一個 15 分鐘市場截止前兩分鐘打開頁面，剩餘時間仍然只有兩分鐘。',
            '把完整日期、開始時間、結束時間和時區一起核對。不同週期或連續輪次對應不同的問題；切換後重新確認所選事件的標題。僅憑“4h”標籤，不能判斷這個市場是否還在交易中。',
          ],
        },
        {
          id: 'prices',
          heading: '2. 基準價格和份額價格有什麼區別？',
          paragraphs: [
            'Price To Beat（基準價格）是該事件展示的比特幣參考基準，“當前價格”展示參考行情。“上漲”和“下跌”份額則有各自的訂單簿報價，表示參與者願意為對應結果支付或接受的價格。買入“上漲”份額不等於買入比特幣。',
            '“上漲”報價為 60 美分時，通常會被解讀為約 60% 的隱含概率，還需要結合報價方式與流動性理解。它不是說比特幣會漲 60%。訂單預覽和實際可成交的買賣報價決定交易成本。',
          ],
          example: {
            label: '假設示例，不是實時行情',
            text: '頁面可能同時顯示 80,000 美元的 BTC 基準價格，以及每份 0.60 美元的“上漲”報價。前者用於理解事件比較的基準，後者是一份結果份額的價格，兩者不能互相代替。',
          },
          links: [{ label: '瞭解預測市場的價格與概率', href: '/learn/prediction-markets' }],
        },
        {
          id: 'source',
          heading: '3. 到底使用哪個比特幣價格判定結果？',
          paragraphs: [
            '打開所選事件的“規則與結算”，核對指定數據源、比較方法、觀察時間，以及價格恰好相等時如何處理。觀察期間一度高於基準，並不能單獨證明最終結果。',
            '例如，風向市場 2026 年 9 月 19 日美東時間下午 4–8 點的 BTC 市場，指定了 Chainlink BTC/USD TWAP 數據流。TWAP 指時間加權平均價格。這裡使用的是規則指定的價格指標，不能隨意換成某家交易所的即時價格或另一張圖表。事件的觀察區間和數據流的平均計算週期是兩個概念。',
            '該示例市場的書面條件把價格相等歸入“上漲”。其他事件仍需分別閱讀自己的規則。若平均計算週期或觀察細節不清楚，應查看指定來源並向官方支持核實，不要僅憑“4h”推測計算公式。',
          ],
          links: [{ label: '查看上述日期市場的規則與結算', href: '/event/btc-updown-4h-1789848000' }],
        },
        {
          id: 'timezones',
          heading: '4. 換算成東南亞當地時間',
          paragraphs: [
            'ET 是美國東部時間，會隨夏令時改變。換算時要帶上事件的實際日期。下表使用 2026 年 9 月 21 日的一個假設區間，不代表正在開放的市場或固定的當地排期。',
            '在這個日期，紐約上午 4–8 點對應 UTC 08:00–12:00。表內當地時間都在 9 月 21 日；換成其他日期或時間段，時差可能不同，也可能跨越午夜。',
          ],
          table: {
            caption: '僅作示例：2026 年 9 月 21 日美東時間上午 4–8 點',
            headers: ['城市 / 地區', '當地觀察時間'],
            rows: [
              ['菲律賓 · 馬尼拉', '16:00–20:00'],
              ['新加坡', '16:00–20:00'],
              ['馬來西亞 · 吉隆坡', '16:00–20:00'],
              ['泰國 · 曼谷', '15:00–19:00'],
              ['越南 · 胡志明市', '15:00–19:00'],
              ['印尼 · 雅加達', '15:00–19:00'],
              ['印尼 · 巴厘島', '16:00–20:00'],
            ],
          },
          links: [{ label: '更多東南亞時區與語言說明', href: '/learn/southeast-asia' }],
        },
        {
          id: 'settlement',
          heading: '5. 倒計時結束後會發生什麼？',
          paragraphs: [
            '觀察區間結束、最終參考價格可用、官方結果被記錄，是不同的步驟。倒計時歸零或圖表出現最終價格，並不能單獨證明份額已經可以兌付。需要查看事件的結算狀態和持倉中實際可用的操作。',
            '按照平臺標準二元結算規則，獲勝份額每份兌付 1 美元，失敗份額兌付 0 美元。交易成本取決於實際成交價和費用；未決、取消或特殊結果按對應規則處理。結算前賣出還需要可成交的買方，不保證能以某個價格退出。',
          ],
          links: [{ label: '官方市場結算文檔（英文）', href: '/docs/resolution-settlement/market-resolution' }],
        },
        {
          id: 'check',
          heading: '快速閱讀清單',
          paragraphs: ['查看 BTC 事件時可以按以下順序核對。這篇指南解釋頁面信息，不預測下一次價格走勢。'],
          points: [
            '確認事件日期、觀察區間和當前狀態。',
            '區分 BTC 基準價格與“上漲、下跌”份額報價。',
            '核對準確的數據來源、比較條件及相等時的處理方式。',
            '結合實際日期和時區換算截止時間。',
            '核對可成交報價、費用和官方結果，再理解預期兌付。',
          ],
          links: [{ label: '瀏覽所有已開放市場', href: '/' }],
        },
      ],
    },
    zh: {
      intro:
        'BTC 涨跌预测市场围绕一个有明确时间区间的问题展开。本指南说明 5 分钟、15 分钟与 4 小时周期的区别，区分比特币参考价格和结果份额报价，并介绍如何核对结算规则与当地时间。当前可交易的周期，以实际开放市场及其各自规则为准。',
      takeaway: '事件标题确定观察区间，“规则与结算”确定数据来源和获胜条件。你的买入时间不会重新设置这两项。',
      sections: [
        {
          id: 'window',
          heading: '1. 5 分钟、15 分钟与 4 小时市场有什么区别？',
          paragraphs: [
            '“5m”“15m”“4h”分别表示固定的 5 分钟、15 分钟和 4 小时观察区间。起止时间属于事件本身，不会因为你何时买入而重新计时。例如，在一个 15 分钟市场截止前两分钟打开页面，剩余时间仍然只有两分钟。',
            '把完整日期、开始时间、结束时间和时区一起核对。不同周期或连续轮次对应不同的问题；切换后重新确认所选事件的标题。仅凭“4h”标签，不能判断这个市场是否还在交易中。',
          ],
        },
        {
          id: 'prices',
          heading: '2. 基准价格和份额价格有什么区别？',
          paragraphs: [
            'Price To Beat（基准价格）是该事件展示的比特币参考基准，“当前价格”展示参考行情。“上涨”和“下跌”份额则有各自的订单簿报价，表示参与者愿意为对应结果支付或接受的价格。买入“上涨”份额不等于买入比特币。',
            '“上涨”报价为 60 美分时，通常会被解读为约 60% 的隐含概率，还需要结合报价方式与流动性理解。它不是说比特币会涨 60%。订单预览和实际可成交的买卖报价决定交易成本。',
          ],
          example: {
            label: '假设示例，不是实时行情',
            text: '页面可能同时显示 80,000 美元的 BTC 基准价格，以及每份 0.60 美元的“上涨”报价。前者用于理解事件比较的基准，后者是一份结果份额的价格，两者不能互相代替。',
          },
          links: [{ label: '了解预测市场的价格与概率', href: '/learn/prediction-markets' }],
        },
        {
          id: 'source',
          heading: '3. 到底使用哪个比特币价格判定结果？',
          paragraphs: [
            '打开所选事件的“规则与结算”，核对指定数据源、比较方法、观察时间，以及价格恰好相等时如何处理。观察期间一度高于基准，并不能单独证明最终结果。',
            '例如，风向市场 2026 年 9 月 19 日美东时间下午 4–8 点的 BTC 市场，指定了 Chainlink BTC/USD TWAP 数据流。TWAP 指时间加权平均价格。这里使用的是规则指定的价格指标，不能随意换成某家交易所的即时价格或另一张图表。事件的观察区间和数据流的平均计算周期是两个概念。',
            '该示例市场的书面条件把价格相等归入“上涨”。其他事件仍需分别阅读自己的规则。若平均计算周期或观察细节不清楚，应查看指定来源并向官方支持核实，不要仅凭“4h”推测计算公式。',
          ],
          links: [{ label: '查看上述日期市场的规则与结算', href: '/event/btc-updown-4h-1789848000' }],
        },
        {
          id: 'timezones',
          heading: '4. 换算成东南亚当地时间',
          paragraphs: [
            'ET 是美国东部时间，会随夏令时改变。换算时要带上事件的实际日期。下表使用 2026 年 9 月 21 日的一个假设区间，不代表正在开放的市场或固定的当地排期。',
            '在这个日期，纽约上午 4–8 点对应 UTC 08:00–12:00。表内当地时间都在 9 月 21 日；换成其他日期或时间段，时差可能不同，也可能跨越午夜。',
          ],
          table: {
            caption: '仅作示例：2026 年 9 月 21 日美东时间上午 4–8 点',
            headers: ['城市 / 地区', '当地观察时间'],
            rows: [
              ['菲律宾 · 马尼拉', '16:00–20:00'],
              ['新加坡', '16:00–20:00'],
              ['马来西亚 · 吉隆坡', '16:00–20:00'],
              ['泰国 · 曼谷', '15:00–19:00'],
              ['越南 · 胡志明市', '15:00–19:00'],
              ['印尼 · 雅加达', '15:00–19:00'],
              ['印尼 · 巴厘岛', '16:00–20:00'],
            ],
          },
          links: [{ label: '更多东南亚时区与语言说明', href: '/learn/southeast-asia' }],
        },
        {
          id: 'settlement',
          heading: '5. 倒计时结束后会发生什么？',
          paragraphs: [
            '观察区间结束、最终参考价格可用、官方结果被记录，是不同的步骤。倒计时归零或图表出现最终价格，并不能单独证明份额已经可以兑付。需要查看事件的结算状态和持仓中实际可用的操作。',
            '按照平台标准二元结算规则，获胜份额每份兑付 1 美元，失败份额兑付 0 美元。交易成本取决于实际成交价和费用；未决、取消或特殊结果按对应规则处理。结算前卖出还需要可成交的买方，不保证能以某个价格退出。',
          ],
          links: [{ label: '官方市场结算文档（英文）', href: '/docs/resolution-settlement/market-resolution' }],
        },
        {
          id: 'check',
          heading: '快速阅读清单',
          paragraphs: ['查看 BTC 事件时可以按以下顺序核对。这篇指南解释页面信息，不预测下一次价格走势。'],
          points: [
            '确认事件日期、观察区间和当前状态。',
            '区分 BTC 基准价格与“上涨、下跌”份额报价。',
            '核对准确的数据来源、比较条件及相等时的处理方式。',
            '结合实际日期和时区换算截止时间。',
            '核对可成交报价、费用和官方结果，再理解预期兑付。',
          ],
          links: [{ label: '浏览所有已开放市场', href: '/' }],
        },
      ],
    },
  },
}

export function getWindMarketResourceContent(id: WindMarketResourceId, locale: WindMarketResourceLocale) {
  return content[id][locale]
}
