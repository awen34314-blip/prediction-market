import { Converter } from 'opencc-js/cn2t'

const convert = Converter({ from: 'cn', to: 'tw' })

/** Reuse existing Chinese event translations without altering their source records. */
export function marketTranslationLocales(locale: string) {
  return locale === 'zh-hant' ? ['zh', 'zh-hant'] : [locale]
}

export function localizeChineseText(text: string, locale: string) {
  return locale === 'zh-hant' ? convert(text) : text
}
