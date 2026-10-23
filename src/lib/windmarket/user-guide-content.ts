import type { ResourceContent } from '@/lib/windmarket/resource-content'
import type { WindMarketResourceId, WindMarketResourceLocale } from '@/lib/windmarket/resources'

export const userGuideContent = {
  deposits: {
    zh: {
      intro:
        '充值前，先确认你当前打开的是 app.windmarket.top，并登录自己的账户。充值窗口展示的可用方式、币种、网络和收款地址，是本次操作需要核对的信息；不要沿用别人提供的地址或上一笔转账的设置。',
      takeaway: '交易已提交、链上已确认、交易余额已更新，是三个需要分别核对的状态。',
      sections: [
        {
          id: 'entry',
          heading: '1. 从自己的账户打开充值',
          paragraphs: [
            '打开账户中的“充值（Deposit）”。如果页面要求先完成资料、身份验证或 Deposit Wallet 设置，请按当前账户提示处理；所需步骤取决于账户状态和平台当前配置。',
            'Deposit Wallet 是页面为当前账户展示的充值钱包。外部连接的钱包和充值钱包可能不是同一个地址，直接转入时应复制充值窗口当前显示的地址。',
          ],
        },
        {
          id: 'methods',
          heading: '2. 选择当前可用的充值方式',
          paragraphs: [
            '钱包充值用于从连接的钱包转入支持的资产；跨链或兑换路线以窗口中的报价为准。“购买加密货币（Buy Crypto）”仅在支付渠道可用时显示，可用地区、支付方式和审核步骤由渠道当次提供。',
            '“转入资金（Transfer Funds）”展示直接转账使用的 USDC、Polygon 网络和充值钱包地址。USDC 可能存在不同网络或合约版本，币种名称相同不代表可以互换。请核对页面指定的资产和网络，再从外部钱包或平台操作。',
          ],
          table: {
            caption: '提交前应逐项核对',
            headers: ['项目', '核对内容'],
            rows: [
              ['币种与网络', '与当前充值页面完全一致'],
              ['收款地址', '从当前登录账户的充值窗口复制并复核'],
              ['金额与费用', '看实际到账预估、网络费及渠道费用'],
              ['渠道限制', '看当前最低金额、地区限制与处理提示'],
            ],
          },
        },
        {
          id: 'confirmation',
          heading: '3. 确认到账',
          paragraphs: [
            '在钱包或支付渠道完成操作后，保存交易哈希或订单编号。等待链上或渠道完成处理，再回到风向市场检查可用交易余额。',
            '钱包弹出“已发送”或渠道显示“已提交”，并不等于风向市场的交易余额已经更新。处理时间随网络与渠道变化，本指南不承诺固定到账时间。',
          ],
        },
        {
          id: 'missing',
          heading: '4. 已转账但余额未更新',
          paragraphs: [
            '先用交易哈希核对是否成功、网络是否正确、收款地址是否与当前账户一致，再检查转入币种和金额。如果交易仍在等待确认，应先查清状态，避免重复提交。',
            '联系官方支持时，可提供交易哈希、时间、币种、网络和错误提示。不要提供私钥、助记词或验证码；官方社区不会要求这些信息来查询到账。',
          ],
          links: [
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: '费用如何核对',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
    en: {
      intro:
        "Start at app.windmarket.top and sign in to your own account. Check the methods, asset, network and receiving address shown in the current deposit window. Do not reuse another person's address or assume the settings from an earlier transfer still apply.",
      takeaway:
        'A submitted transfer, a confirmed transaction and an updated trading balance are separate checkpoints.',
      sections: [
        {
          id: 'entry',
          heading: '1. Open Deposit from your account',
          paragraphs: [
            'Open Deposit in your account. Complete any profile, identity verification or Deposit Wallet setup requested for that account. The required steps depend on your account status and the current site configuration.',
            'The Deposit Wallet is the receiving wallet shown for your account. It may differ from your connected external wallet. For a direct transfer, copy the address displayed in the current deposit window.',
          ],
        },
        {
          id: 'methods',
          heading: '2. Choose an available method',
          paragraphs: [
            'Wallet funding transfers a supported asset from your connected wallet. Review the displayed quote for any bridge or swap route. Buy Crypto appears only when the payment channel is available; supported regions, payment methods and verification are determined by that channel.',
            'Transfer Funds shows USDC on Polygon and your Deposit Wallet address for a direct transfer. USDC can exist on different networks or under different token contracts. A matching ticker alone is not enough: check the exact asset and network displayed before sending.',
          ],
          table: {
            caption: 'Check before submitting',
            headers: ['Item', 'What to verify'],
            rows: [
              ['Asset and network', 'Match the current deposit flow'],
              ['Receiving address', 'Copy and verify it from your signed-in account'],
              ['Amount and fees', 'Review expected receipt, network costs and provider fees'],
              ['Provider limits', 'Read current minimums, regional availability and processing notices'],
            ],
          },
        },
        {
          id: 'confirmation',
          heading: '3. Check that funds arrived',
          paragraphs: [
            'Keep the transaction hash or provider reference after submitting. Wait for the network or provider to complete processing, then check your available WindMarket trading balance.',
            'A Sent or Submitted message does not confirm that the trading balance has updated. Processing time varies by network and provider; there is no fixed arrival time promised by this guide.',
          ],
        },
        {
          id: 'missing',
          heading: '4. If your balance has not updated',
          paragraphs: [
            'Use the transaction hash to check the result, network and receiving address, then confirm the asset and amount. If the transaction is still pending, establish its status before submitting again.',
            'Give official support the transaction hash, time, asset, network and error message. Never share private keys, seed phrases or verification codes to investigate a deposit.',
          ],
          links: [
            {
              label: 'Official Telegram support',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: 'Understanding fees',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
    'zh-hant': {
      intro:
        '充值前，先確認你當前打開的是 app.windmarket.top，並登錄自己的賬戶。充值窗口展示的可用方式、幣種、網絡和收款地址，是本次操作需要核對的信息；不要沿用別人提供的地址或上一筆轉賬的設置。',
      takeaway: '交易已提交、鏈上已確認、交易餘額已更新，是三個需要分別核對的狀態。',
      sections: [
        {
          id: 'entry',
          heading: '1. 從自己的賬戶打開充值',
          paragraphs: [
            '打開賬戶中的“充值（Deposit）”。如果頁面要求先完成資料、身份驗證或 Deposit Wallet 設置，請按當前賬戶提示處理；所需步驟取決於賬戶狀態和平臺當前配置。',
            'Deposit Wallet 是頁面為當前賬戶展示的充值錢包。外部連接的錢包和充值錢包可能不是同一個地址，直接轉入時應複製充值窗口當前顯示的地址。',
          ],
        },
        {
          id: 'methods',
          heading: '2. 選擇當前可用的充值方式',
          paragraphs: [
            '錢包充值用於從連接的錢包轉入支持的資產；跨鏈或兌換路線以窗口中的報價為準。“購買加密貨幣（Buy Crypto）”僅在支付渠道可用時顯示，可用地區、支付方式和審核步驟由渠道當次提供。',
            '“轉入資金（Transfer Funds）”展示直接轉賬使用的 USDC、Polygon 網絡和充值錢包地址。USDC 可能存在不同網絡或合約版本，幣種名稱相同不代表可以互換。請核對頁面指定的資產和網絡，再從外部錢包或平臺操作。',
          ],
          table: {
            caption: '提交前應逐項核對',
            headers: ['項目', '核對內容'],
            rows: [
              ['幣種與網絡', '與當前充值頁面完全一致'],
              ['收款地址', '從當前登錄賬戶的充值窗口複製並複核'],
              ['金額與費用', '看實際到賬預估、網絡費及渠道費用'],
              ['渠道限制', '看當前最低金額、地區限制與處理提示'],
            ],
          },
        },
        {
          id: 'confirmation',
          heading: '3. 確認到賬',
          paragraphs: [
            '在錢包或支付渠道完成操作後，保存交易哈希或訂單編號。等待鏈上或渠道完成處理，再回到風向市場檢查可用交易餘額。',
            '錢包彈出“已發送”或渠道顯示“已提交”，並不等於風向市場的交易餘額已經更新。處理時間隨網絡與渠道變化，本指南不承諾固定到賬時間。',
          ],
        },
        {
          id: 'missing',
          heading: '4. 已轉賬但餘額未更新',
          paragraphs: [
            '先用交易哈希核對是否成功、網絡是否正確、收款地址是否與當前賬戶一致，再檢查轉入幣種和金額。如果交易仍在等待確認，應先查清狀態，避免重複提交。',
            '聯繫官方支持時，可提供交易哈希、時間、幣種、網絡和錯誤提示。不要提供私鑰、助記詞或驗證碼；官方社區不會要求這些信息來查詢到賬。',
          ],
          links: [
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: '費用如何核對',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
  },
  withdrawals: {
    zh: {
      intro:
        '提现把可用的账户资金发送到你指定的收款地址。它与卖出份额、领取结算收益是不同操作；先确认可用余额，再核对收款平台支持的币种和网络。',
      takeaway: '持仓估值不是可提现余额；“提现已提交”也不是收款方已经到账。',
      sections: [
        {
          id: 'balance',
          heading: '1. 先确认资金处于什么状态',
          paragraphs: [
            '查看账户显示的可用余额。仍持有的市场份额属于持仓；如果要在结算前卖出，需要有可成交的买方，实际成交价和费用决定收到的金额。',
            '已结束的市场也可能尚未完成最终判定。只有页面显示可领取时，才能按提示领取结算收益，并在确认后检查余额。',
          ],
          links: [
            {
              label: '了解结算和领取',
              href: '/learn/settlement',
            },
          ],
        },
        {
          id: 'destination',
          heading: '2. 核对收款地址和网络',
          paragraphs: [
            '从账户或钱包菜单打开“提现（Withdraw）”，填写收款地址和金额。当前提现流程使用 USDC 与 Polygon；提交时仍应以窗口显示为准，并确认收款钱包或平台支持对应的资产和网络。',
            '即使两个网络上的地址看起来相同，也不能据此判断收款平台支持该转账。向交易所转入时，应先打开该平台的充值页面核对网络、币种和最低入账要求。',
            '如果使用“连接的钱包”快捷填入地址，也要重新核对地址是否是你希望接收这笔资金的账户。',
          ],
        },
        {
          id: 'submit',
          heading: '3. 检查金额并提交',
          paragraphs: [
            '核对收款地址、币种、网络、金额和页面列出的费用。金额不能超过当前可用余额。按页面提示完成账户或签名步骤，并保存提交结果。',
            '如果提示钱包连接过期，重新连接后检查上一笔请求的状态，再决定是否重新提交。不要把关闭弹窗当作交易已取消，也不要把签名完成当作链上已完成。',
          ],
        },
        {
          id: 'follow',
          heading: '4. 提交后如何确认到账',
          paragraphs: [
            '查看交易记录以及可用的交易哈希，区分等待处理、成功和失败。链上成功后，收款平台可能还需要自己的入账确认；具体时间以网络和接收方状态为准。',
            '如果地址、网络或状态不明确，请带上交易哈希与错误提示联系官方支持。已经广播的链上转账通常不能从网页撤回，因此地址应在签名前核对。',
          ],
          links: [
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: '了解费用组成',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
    en: {
      intro:
        "A withdrawal sends available account funds to the receiving address you specify. Selling shares and claiming settled winnings are separate operations. Check your available balance and the recipient's supported asset and network first.",
      takeaway:
        'The value of a position is not an available cash balance, and a submitted withdrawal is not confirmed receipt.',
      sections: [
        {
          id: 'balance',
          heading: '1. Check which funds are available',
          paragraphs: [
            'Use the available balance shown in your account. Market shares remain positions until sold or redeemed. Selling before settlement requires an executable buyer; the fill price and fees determine the funds received.',
            'An event can have ended without its outcome being final. Claim only when the page shows that the position is claimable, then check the balance after confirmation.',
          ],
          links: [
            {
              label: 'Settlement and claims',
              href: '/learn/settlement',
            },
          ],
        },
        {
          id: 'destination',
          heading: '2. Verify the recipient and network',
          paragraphs: [
            'Open Withdraw from your account or wallet menu and enter the receiving address and amount. The current withdrawal flow uses USDC on Polygon; verify the details shown when submitting and confirm the recipient supports that exact asset and network.',
            'An address looking the same on two networks does not prove the receiving platform supports both. For an exchange deposit, check its deposit page for the asset, network and minimum credited amount.',
            'If you use the connected-wallet shortcut, verify that it fills the account you intend to receive these funds.',
          ],
        },
        {
          id: 'submit',
          heading: '3. Review and submit',
          paragraphs: [
            'Check the recipient, asset, network, amount and any displayed fees. The amount must fit your available balance. Complete the account or signature steps shown, and keep the submission result.',
            "If your wallet connection has expired, reconnect and establish the previous request's status before retrying. Closing a dialog does not cancel a broadcast transaction, and completing a signature does not confirm onchain completion.",
          ],
        },
        {
          id: 'follow',
          heading: '4. Follow the transfer',
          paragraphs: [
            'Check transaction history and any available transaction hash to distinguish pending, successful and failed transfers. A receiving platform may require its own crediting confirmations after onchain success; timing depends on the network and recipient.',
            'Contact official support with the transaction hash and error message if the details or status are unclear. A broadcast onchain transfer generally cannot be recalled from the webpage, so verify the address before signing.',
          ],
          links: [
            {
              label: 'Official Telegram support',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: 'Understanding fees',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
    'zh-hant': {
      intro:
        '提現把可用的賬戶資金髮送到你指定的收款地址。它與賣出份額、領取結算收益是不同操作；先確認可用餘額，再核對收款平臺支持的幣種和網絡。',
      takeaway: '持倉估值不是可提現餘額；“提現已提交”也不是收款方已經到賬。',
      sections: [
        {
          id: 'balance',
          heading: '1. 先確認資金處於什麼狀態',
          paragraphs: [
            '查看賬戶顯示的可用餘額。仍持有的市場份額屬於持倉；如果要在結算前賣出，需要有可成交的買方，實際成交價和費用決定收到的金額。',
            '已結束的市場也可能尚未完成最終判定。只有頁面顯示可領取時，才能按提示領取結算收益，並在確認後檢查餘額。',
          ],
          links: [
            {
              label: '瞭解結算和領取',
              href: '/learn/settlement',
            },
          ],
        },
        {
          id: 'destination',
          heading: '2. 核對收款地址和網絡',
          paragraphs: [
            '從賬戶或錢包菜單打開“提現（Withdraw）”，填寫收款地址和金額。當前提現流程使用 USDC 與 Polygon；提交時仍應以窗口顯示為準，並確認收款錢包或平臺支持對應的資產和網絡。',
            '即使兩個網絡上的地址看起來相同，也不能據此判斷收款平臺支持該轉賬。向交易所轉入時，應先打開該平臺的充值頁面核對網絡、幣種和最低入賬要求。',
            '如果使用“連接的錢包”快捷填入地址，也要重新核對地址是否是你希望接收這筆資金的賬戶。',
          ],
        },
        {
          id: 'submit',
          heading: '3. 檢查金額並提交',
          paragraphs: [
            '核對收款地址、幣種、網絡、金額和頁面列出的費用。金額不能超過當前可用餘額。按頁面提示完成賬戶或簽名步驟，並保存提交結果。',
            '如果提示錢包連接過期，重新連接後檢查上一筆請求的狀態，再決定是否重新提交。不要把關閉彈窗當作交易已取消，也不要把簽名完成當作鏈上已完成。',
          ],
        },
        {
          id: 'follow',
          heading: '4. 提交後如何確認到賬',
          paragraphs: [
            '查看交易記錄以及可用的交易哈希，區分等待處理、成功和失敗。鏈上成功後，收款平臺可能還需要自己的入賬確認；具體時間以網絡和接收方狀態為準。',
            '如果地址、網絡或狀態不明確，請帶上交易哈希與錯誤提示聯繫官方支持。已經廣播的鏈上轉賬通常不能從網頁撤回，因此地址應在簽名前核對。',
          ],
          links: [
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
            {
              label: '瞭解費用組成',
              href: '/learn/fees',
            },
          ],
        },
      ],
    },
  },
  fees: {
    zh: {
      intro:
        '一笔操作的成本可能来自多个环节。看见某个项目显示为零，并不代表整个过程没有费用。应先判断你正在下单、充值、跨链还是提现，再核对该步骤实际展示的报价。',
      takeaway: '签名前看订单或渠道预览，完成后看成交与交易记录；不要用固定费率估算所有市场。',
      sections: [
        {
          id: 'costs',
          heading: '1. 分清四类成本',
          paragraphs: [
            '交易手续费、买卖价差、网络费和渠道费用有不同来源。买卖价差会影响成交成本，但不是平台另收的一项手续费。',
          ],
          table: {
            caption: '费用与价格影响来自哪里',
            headers: ['项目', '如何核对'],
            rows: [
              ['交易手续费', '下单前查看订单预览，成交后查看实际记录'],
              ['买卖价差及价格影响', '对照可成交的买价、卖价与订单数量'],
              ['网络或跨链成本', '查看钱包、跨链路线或交易预览'],
              ['支付渠道费用', '查看买币或入金渠道的当次报价与条款'],
            ],
          },
        },
        {
          id: 'execution',
          heading: '2. 限价单也可能产生 taker 费用',
          paragraphs: [
            '立即与已有挂单成交的部分属于 taker（吃单）执行。限价单如果提交后立即成交，也可能是 taker；只有留下来提供流动性的部分，才按 maker（挂单）方式处理。',
            '是否收取 maker 费用以及实际费率，以当前市场配置和订单预览为准。不要把“限价单”直接理解为“免手续费”。',
          ],
        },
        {
          id: 'amount',
          heading: '3. 为什么不同订单的费用不同',
          paragraphs: [
            '费用会受市场费率设置、成交价格和成交数量影响。当前交易系统使用随价格变化的费用规则，不能只把订单总额乘以一个适用于所有市场的固定百分比。',
            '一张订单可能拆成多次成交，各次价格和费用可能不同。未成交的份额不按已成交交易收费；最终金额应以成交记录为准，而不是只看最初预估。',
          ],
          example: {
            label: '假设示例，不是当前费率',
            text: '假设买入 100 份、每份成交价为 0.40 USDC，仅份额价款就是 40 USDC。实际支付或收到的金额还需要结合该次成交费用；这个例子没有假设任何固定手续费率。',
          },
        },
        {
          id: 'records',
          heading: '4. 到哪里确认最终金额',
          paragraphs: [
            '下单前核对数量、可成交价格、费用与总额；成交后在投资组合的历史记录中核对实际执行。充值、跨链和提现则结合相应渠道记录和链上交易状态查看。',
            '如果预估与实际不同，先检查是否发生了部分成交、不同价格的多笔成交或渠道报价更新。仍有疑问时，提供订单或交易编号向官方支持查询。',
          ],
          links: [
            {
              label: '交易费用文档与费率图表（英文）',
              href: '/docs/fees-limits/trading-fees',
            },
            {
              label: '充值指南',
              href: '/learn/deposits',
            },
            {
              label: '提现指南',
              href: '/learn/withdrawals',
            },
          ],
        },
      ],
    },
    en: {
      intro:
        'An operation can have costs at several stages. A zero shown for one item does not mean the entire process is free. Identify whether you are trading, funding, bridging or withdrawing, then review the quote for that step.',
      takeaway:
        'Review the preview before signing and the execution records afterwards. Do not assume one fixed fee applies to every market.',
      sections: [
        {
          id: 'costs',
          heading: '1. Separate the cost categories',
          paragraphs: [
            'Trading fees, spread, network costs and provider charges come from different sources. The bid–ask spread affects execution cost but is not a separate platform fee.',
          ],
          table: {
            caption: 'Where to check each cost',
            headers: ['Item', 'Where to verify'],
            rows: [
              ['Trading fee', 'Order preview, then the actual execution record'],
              ['Spread and price impact', 'Executable bids, asks and order quantity'],
              ['Network or bridge cost', 'Wallet, bridge route or transaction preview'],
              ['Payment provider charge', "The funding provider's current quote and terms"],
            ],
          },
        },
        {
          id: 'execution',
          heading: '2. A limit order can still pay a taker fee',
          paragraphs: [
            'A fill that immediately matches existing liquidity is a taker execution. A limit order can be a taker if it executes immediately; only the portion left resting to provide liquidity is treated as maker activity.',
            'Whether maker fees apply and the actual rates depend on the current market configuration and order preview. A limit order does not automatically mean fee-free execution.',
          ],
        },
        {
          id: 'amount',
          heading: '3. Why fees differ between orders',
          paragraphs: [
            "Fees depend on the market's fee settings, execution price and filled quantity. The current system uses price-dependent fee rules, so a single percentage of order value cannot describe every market.",
            'An order may fill in several trades at different prices and fees. Unfilled shares are not charged as completed trades. Use execution records for the final amount rather than only the initial estimate.',
          ],
          example: {
            label: 'Illustrative example, not a live fee quote',
            text: 'Buying 100 shares at 0.40 USDC costs 40 USDC for the shares alone. The amount paid or received must also account for the applicable execution fees. This example assumes no fixed fee rate.',
          },
        },
        {
          id: 'records',
          heading: '4. Verify the final amount',
          paragraphs: [
            'Before trading, review quantity, executable prices, fees and total. After execution, check Portfolio history. For funding, bridging or withdrawals, also review the relevant provider record and onchain transaction status.',
            'If the estimate and final result differ, check for partial fills, multiple execution prices or an updated provider quote. Give official support the order or transaction reference if you need help.',
          ],
          links: [
            {
              label: 'Trading fee documentation and charts',
              href: '/docs/fees-limits/trading-fees',
            },
            {
              label: 'Deposit guide',
              href: '/learn/deposits',
            },
            {
              label: 'Withdrawal guide',
              href: '/learn/withdrawals',
            },
          ],
        },
      ],
    },
    'zh-hant': {
      intro:
        '一筆操作的成本可能來自多個環節。看見某個項目顯示為零，並不代表整個過程沒有費用。應先判斷你正在下單、充值、跨鏈還是提現，再核對該步驟實際展示的報價。',
      takeaway: '簽名前看訂單或渠道預覽，完成後看成交與交易記錄；不要用固定費率估算所有市場。',
      sections: [
        {
          id: 'costs',
          heading: '1. 分清四類成本',
          paragraphs: [
            '交易手續費、買賣價差、網絡費和渠道費用有不同來源。買賣價差會影響成交成本，但不是平臺另收的一項手續費。',
          ],
          table: {
            caption: '費用與價格影響來自哪裡',
            headers: ['項目', '如何核對'],
            rows: [
              ['交易手續費', '下單前查看訂單預覽，成交後查看實際記錄'],
              ['買賣價差及價格影響', '對照可成交的買價、賣價與訂單數量'],
              ['網絡或跨鏈成本', '查看錢包、跨鏈路線或交易預覽'],
              ['支付渠道費用', '查看買幣或入金渠道的當次報價與條款'],
            ],
          },
        },
        {
          id: 'execution',
          heading: '2. 限價單也可能產生 taker 費用',
          paragraphs: [
            '立即與已有掛單成交的部分屬於 taker（吃單）執行。限價單如果提交後立即成交，也可能是 taker；只有留下來提供流動性的部分，才按 maker（掛單）方式處理。',
            '是否收取 maker 費用以及實際費率，以當前市場配置和訂單預覽為準。不要把“限價單”直接理解為“免手續費”。',
          ],
        },
        {
          id: 'amount',
          heading: '3. 為什麼不同訂單的費用不同',
          paragraphs: [
            '費用會受市場費率設置、成交價格和成交數量影響。當前交易系統使用隨價格變化的費用規則，不能只把訂單總額乘以一個適用於所有市場的固定百分比。',
            '一張訂單可能拆成多次成交，各次價格和費用可能不同。未成交的份額不按已成交交易收費；最終金額應以成交記錄為準，而不是隻看最初預估。',
          ],
          example: {
            label: '假設示例，不是當前費率',
            text: '假設買入 100 份、每份成交價為 0.40 USDC，僅份額價款就是 40 USDC。實際支付或收到的金額還需要結合該次成交費用；這個例子沒有假設任何固定手續費率。',
          },
        },
        {
          id: 'records',
          heading: '4. 到哪裡確認最終金額',
          paragraphs: [
            '下單前核對數量、可成交價格、費用與總額；成交後在投資組合的歷史記錄中核對實際執行。充值、跨鏈和提現則結合相應渠道記錄和鏈上交易狀態查看。',
            '如果預估與實際不同，先檢查是否發生了部分成交、不同價格的多筆成交或渠道報價更新。仍有疑問時，提供訂單或交易編號向官方支持查詢。',
          ],
          links: [
            {
              label: '交易費用文檔與費率圖表（英文）',
              href: '/docs/fees-limits/trading-fees',
            },
            {
              label: '充值指南',
              href: '/learn/deposits',
            },
            {
              label: '提現指南',
              href: '/learn/withdrawals',
            },
          ],
        },
      ],
    },
  },
  settlement: {
    zh: {
      intro:
        '市场倒计时结束后，还需要依据该市场的规则确认结果，再开放相应的领取操作。价格走势、新闻标题或其他平台的结果，都不能代替当前市场写明的结算条件。',
      takeaway: '事件结束 → 结果确认 → 领取可兑付份额 → 检查可用余额。提现是之后的独立操作。',
      sections: [
        {
          id: 'rules',
          heading: '1. 以所选市场的完整规则为准',
          paragraphs: [
            '打开“规则与结算”，核对结果条件、指定数据来源、日期、时区、比较阈值以及特殊情况。标题只提供概括；相似标题的两个市场也可能使用不同规则。',
            'BTC 等涨跌市场尤其需要核对观察区间、基准价格、最终取值方法和价格相等时的处理。某个时间点曾高于基准，不代表它最终满足上涨条件。',
          ],
          links: [
            {
              label: 'BTC 不同周期的阅读指南',
              href: '/learn/bitcoin-up-or-down',
            },
          ],
        },
        {
          id: 'final',
          heading: '2. 结束时间不等于最终结算时间',
          paragraphs: [
            '事件结束后，指定来源需要提供可核实的结果，再由获授权的结算方按规则提交官方判定。当前系统使用 DRO 记录最终结果；用户报告可以提供信息，但不会自行完成结算。',
            '等待确认、复核或特殊情况处理期间，页面可能暂时没有领取入口。以市场实际状态为准，不要根据倒计时归零就推定资金已经可以领取。',
          ],
        },
        {
          id: 'claim',
          heading: '3. 最终确认后如何领取',
          paragraphs: [
            '按标准二元市场规则，获胜份额每份可兑付 1 美元，失败份额为 0 美元。取消、未知、特殊结果或其他非标准情况，按该市场规则和实际最终状态处理。',
            '在投资组合中查看可领取的持仓，或使用已结算市场显示的“领取（Claim）”入口。核对所选市场与数量，按提示签名并等待确认，然后检查可用余额。',
          ],
          example: {
            label: '假设示例，不是收益承诺',
            text: '如果以每份 0.35 USDC 买入 100 份，份额成本为 35 USDC。若该结果最终获胜，标准兑付为 100 USDC；差额还没有扣除交易等相关费用。若结果失败，标准兑付为 0。',
          },
          links: [
            {
              label: '费用说明',
              href: '/learn/fees',
            },
            {
              label: '领取后如何提现',
              href: '/learn/withdrawals',
            },
          ],
        },
        {
          id: 'issues',
          heading: '4. 遇到延迟或判定疑问',
          paragraphs: [
            '先检查完整规则、指定来源和页面显示的当前状态。活动延期、来源更正或结果不明确，都可能需要额外核实。具体处理以对应市场规则为准。',
            '联系官方支持时附上市场链接、有关时间、规则依据以及错误提示；领取操作失败时，再提供交易哈希。不要把结算结果报告的保证金、报告奖励与持仓兑付混为同一笔资金。',
          ],
          links: [
            {
              label: 'DRO 市场结算文档（英文）',
              href: '/docs/resolution-settlement/market-resolution',
            },
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
          ],
        },
      ],
    },
    en: {
      intro:
        "After an event's countdown ends, its outcome must be confirmed under that market's rules before the relevant claims become available. A price chart, headline or result on another platform cannot replace the written resolution criteria.",
      takeaway:
        'Event ends → outcome becomes final → redeem eligible shares → check available balance. Withdrawal is a separate next step.',
      sections: [
        {
          id: 'rules',
          heading: "1. Read the selected market's complete rules",
          paragraphs: [
            'Open Rules and settlement and check the outcome criteria, named source, date, timezone, thresholds and edge cases. The title is a summary; two similarly titled markets can have different rules.',
            'For BTC and other Up or Down markets, verify the observation window, reference price, final-price method and treatment of a tie. Trading above the reference at one point does not establish the final outcome.',
          ],
          links: [
            {
              label: 'Reading different BTC market windows',
              href: '/learn/bitcoin-up-or-down',
            },
          ],
        },
        {
          id: 'final',
          heading: '2. The event ending is not final settlement',
          paragraphs: [
            'After the event ends, the named source must provide a verifiable result and an approved resolver must submit the official outcome under the rules. The current system records final outcomes through DRO. User reports can inform the process but do not settle the market by themselves.',
            'Claims may remain unavailable while a result is pending, being reviewed or subject to an edge case. Check the actual market status rather than assuming a zero countdown makes funds claimable.',
          ],
        },
        {
          id: 'claim',
          heading: '3. Claim after the result is final',
          paragraphs: [
            "Under standard binary settlement, winning shares redeem for $1 each and losing shares for $0. Canceled, unknown or other nonstandard outcomes follow the market's applicable rules and final state.",
            'Find eligible positions in Portfolio or use the Claim action shown on a resolved market. Review the selected markets and quantities, sign when prompted, wait for confirmation and check the available balance.',
          ],
          example: {
            label: 'Illustrative example, not a return promise',
            text: 'Buying 100 shares at 0.35 USDC costs 35 USDC for the shares. If that outcome ultimately wins, standard redemption is 100 USDC before accounting for trading and other applicable costs. A losing outcome redeems for zero under standard binary settlement.',
          },
          links: [
            {
              label: 'Fees explained',
              href: '/learn/fees',
            },
            {
              label: 'Withdrawing after a claim',
              href: '/learn/withdrawals',
            },
          ],
        },
        {
          id: 'issues',
          heading: '4. Delays and questions about the outcome',
          paragraphs: [
            "Check the complete rules, named source and current market status. A delayed event, source correction or unclear result may require further verification. The individual market's rules govern how it is handled.",
            'Contact official support with the market link, relevant times, rule evidence and error message. Include the transaction hash if a claim fails. Resolution-report bonds and rewards are separate from redemption of your market positions.',
          ],
          links: [
            {
              label: 'DRO market resolution documentation',
              href: '/docs/resolution-settlement/market-resolution',
            },
            {
              label: 'Official Telegram support',
              href: 'https://t.me/WindMarketOfficial',
            },
          ],
        },
      ],
    },
    'zh-hant': {
      intro:
        '市場倒計時結束後，還需要依據該市場的規則確認結果，再開放相應的領取操作。價格走勢、新聞標題或其他平臺的結果，都不能代替當前市場寫明的結算條件。',
      takeaway: '事件結束 → 結果確認 → 領取可兌付份額 → 檢查可用餘額。提現是之後的獨立操作。',
      sections: [
        {
          id: 'rules',
          heading: '1. 以所選市場的完整規則為準',
          paragraphs: [
            '打開“規則與結算”，核對結果條件、指定數據來源、日期、時區、比較閾值以及特殊情況。標題只提供概括；相似標題的兩個市場也可能使用不同規則。',
            'BTC 等漲跌市場尤其需要核對觀察區間、基準價格、最終取值方法和價格相等時的處理。某個時間點曾高於基準，不代表它最終滿足上漲條件。',
          ],
          links: [
            {
              label: 'BTC 不同週期的閱讀指南',
              href: '/learn/bitcoin-up-or-down',
            },
          ],
        },
        {
          id: 'final',
          heading: '2. 結束時間不等於最終結算時間',
          paragraphs: [
            '事件結束後，指定來源需要提供可核實的結果，再由獲授權的結算方按規則提交官方判定。當前系統使用 DRO 記錄最終結果；用戶報告可以提供信息，但不會自行完成結算。',
            '等待確認、複核或特殊情況處理期間，頁面可能暫時沒有領取入口。以市場實際狀態為準，不要根據倒計時歸零就推定資金已經可以領取。',
          ],
        },
        {
          id: 'claim',
          heading: '3. 最終確認後如何領取',
          paragraphs: [
            '按標準二元市場規則，獲勝份額每份可兌付 1 美元，失敗份額為 0 美元。取消、未知、特殊結果或其他非標準情況，按該市場規則和實際最終狀態處理。',
            '在投資組合中查看可領取的持倉，或使用已結算市場顯示的“領取（Claim）”入口。核對所選市場與數量，按提示簽名並等待確認，然後檢查可用餘額。',
          ],
          example: {
            label: '假設示例，不是收益承諾',
            text: '如果以每份 0.35 USDC 買入 100 份，份額成本為 35 USDC。若該結果最終獲勝，標準兌付為 100 USDC；差額還沒有扣除交易等相關費用。若結果失敗，標準兌付為 0。',
          },
          links: [
            {
              label: '費用說明',
              href: '/learn/fees',
            },
            {
              label: '領取後如何提現',
              href: '/learn/withdrawals',
            },
          ],
        },
        {
          id: 'issues',
          heading: '4. 遇到延遲或判定疑問',
          paragraphs: [
            '先檢查完整規則、指定來源和頁面顯示的當前狀態。活動延期、來源更正或結果不明確，都可能需要額外核實。具體處理以對應市場規則為準。',
            '聯繫官方支持時附上市場鏈接、有關時間、規則依據以及錯誤提示；領取操作失敗時，再提供交易哈希。不要把結算結果報告的保證金、報告獎勵與持倉兌付混為同一筆資金。',
          ],
          links: [
            {
              label: 'DRO 市場結算文檔（英文）',
              href: '/docs/resolution-settlement/market-resolution',
            },
            {
              label: '官方 Telegram 支持',
              href: 'https://t.me/WindMarketOfficial',
            },
          ],
        },
      ],
    },
  },
} satisfies Partial<Record<WindMarketResourceId, Record<WindMarketResourceLocale, ResourceContent>>>
