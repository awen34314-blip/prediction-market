import type { WindMarketResourceId, WindMarketResourceLocale } from '@/lib/windmarket/resources'

interface ResourceSection {
  id: string
  heading: string
  paragraphs: string[]
  points?: string[]
  example?: { label: string; text: string }
  table?: { caption: string; headers: string[]; rows: string[][] }
  links?: { label: string; href: string }[]
}

interface ResourceContent {
  intro: string
  takeaway: string
  sections: ResourceSection[]
}

// Editorial content is imported by the server-rendered resource pages, not the trading UI.
const content: Record<WindMarketResourceId, Record<WindMarketResourceLocale, ResourceContent>> = {
  about: {
    zh: {
      intro:
        '风向市场（WindMarket）是面向东南亚社区的真实世界事件预测平台。我们希望让读者用清晰的问题、可核对的规则和市场概率，理解正在发生的事情。',
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
            '本站地址为 app.windmarket.top。官方 Telegram 社区为 @WindMarketOfficial，可用于讨论市场和获取使用帮助。请从本站的社区入口访问，涉及充值时核对账户内展示的信息。',
          ],
          links: [
            { label: '阅读平台服务条款', href: '/tos' },
            { label: '查看平台使用文档（英文）', href: '/docs' },
          ],
        },
      ],
    },
    en: {
      intro:
        'WindMarket is a real-world event prediction platform focused on Southeast Asian communities. It brings clearly defined questions, verifiable rules and market probabilities into one place to help readers make sense of events.',
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
            'Our website is app.windmarket.top. The official Telegram community, @WindMarketOfficial, is a place for market discussion and help using the platform. Follow the community link on this website and check the information shown in your account when arranging a deposit.',
          ],
          links: [
            { label: 'Read the platform terms', href: '/tos' },
            { label: 'Explore the platform documentation', href: '/docs' },
          ],
        },
      ],
    },
  },
  'prediction-markets': {
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
            '无论关注全球新闻、体育还是加密资产相关事件，都可以用同一套顺序检查页面。实际有哪些市场，应以当前市场列表为准。',
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
            'Whether following global news, sport or crypto-related events, you can use the same sequence to read a market. Refer to the current market list for events actually available.',
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
}

export function getWindMarketResourceContent(id: WindMarketResourceId, locale: WindMarketResourceLocale) {
  return content[id][locale]
}
