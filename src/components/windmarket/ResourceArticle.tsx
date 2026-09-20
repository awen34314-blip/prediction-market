import { ArrowRightIcon, ArrowUpRightIcon, BookOpenIcon, ChevronRightIcon } from 'lucide-react'

import type { WindMarketResourceId, WindMarketResourceLocale } from '@/lib/windmarket/resources'

import ResourceLinks from '@/components/windmarket/ResourceLinks'
import { withLocalePrefix } from '@/lib/locale-path'
import { windmarket } from '@/lib/windmarket/config'
import { getWindMarketResourceContent } from '@/lib/windmarket/resource-content'
import { getWindMarketResourceHref, windmarketResources } from '@/lib/windmarket/resources'

export default function ResourceArticle({
  id,
  locale,
  languages,
}: {
  id: WindMarketResourceId
  locale: WindMarketResourceLocale
  languages: WindMarketResourceLocale[]
}) {
  const zh = locale === 'zh'
  const resource = windmarketResources[id]
  const copy = resource.copy[locale]
  const content = getWindMarketResourceContent(id, locale)
  return (
    <main className="wm-resource" lang={locale}>
      <nav className="wm-resource-breadcrumb" aria-label={zh ? '面包屑导航' : 'Breadcrumb'}>
        <a href={withLocalePrefix('/', locale)}>{zh ? '风向市场' : 'WindMarket'}</a>
        <ChevronRightIcon size={13} aria-hidden="true" />
        <span aria-current="page">{copy.label}</span>
      </nav>
      <header className="wm-resource-header">
        <div className="wm-resource-eyebrow">
          <BookOpenIcon size={16} aria-hidden="true" />
          {zh ? '了解风向市场' : 'WINDMARKET GUIDES'}
        </div>
        <h1>{copy.heading}</h1>
        <p className="wm-resource-intro">{content.intro}</p>
        <div className="wm-resource-meta">
          <span>
            {zh ? '更新于 ' : 'Updated '}
            <time dateTime={resource.updated}>{resource.updated}</time>
          </span>
          <nav aria-label={zh ? '文章语言' : 'Article language'}>
            {languages.map((language) => (
              <a
                key={language}
                href={getWindMarketResourceHref(id, language)}
                hrefLang={language}
                lang={language}
                aria-current={language === locale ? 'page' : undefined}
              >
                {language === 'zh' ? '中文' : 'English'}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <div className="wm-resource-layout">
        <article className="wm-resource-body" aria-label={copy.label}>
          <p className="wm-resource-takeaway">{content.takeaway}</p>
          {content.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {section.example && (
                <aside className="wm-resource-example">
                  <h3>{section.example.label}</h3>
                  <p>{section.example.text}</p>
                </aside>
              )}
              {section.table && (
                <div className="wm-resource-table-wrap">
                  <table>
                    <caption>{section.table.caption}</caption>
                    <thead>
                      <tr>
                        {section.table.headers.map((heading) => (
                          <th key={heading} scope="col">
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) =>
                            index === 0 ? (
                              <th key={cell} scope="row">
                                {cell}
                              </th>
                            ) : (
                              <td key={cell}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.links && (
                <div className="wm-resource-references">
                  {section.links.map((link) => (
                    <a key={link.href} href={withLocalePrefix(link.href, locale)}>
                      {link.label}
                      <ArrowRightIcon size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
        <aside className="wm-resource-toc" aria-label={zh ? '本页目录' : 'On this page'}>
          <div>
            <p>{zh ? '本页内容' : 'ON THIS PAGE'}</p>
            <nav>
              {content.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.heading}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
      <footer className="wm-resource-footer">
        <h2>{zh ? '继续了解' : 'Keep exploring'}</h2>
        <ResourceLinks locale={locale} current={id} />
        <div className="wm-resource-actions">
          <a href={withLocalePrefix('/', locale)} className="wm-resource-market-link">
            {zh ? '浏览当前市场' : 'Browse current markets'}
            <ArrowRightIcon size={16} aria-hidden="true" />
          </a>
          {windmarket.community.enabled && (
            <a href={windmarket.community.url} target="_blank" rel="noopener noreferrer">
              {zh ? '官方 Telegram 社区' : 'Official Telegram community'}
              <ArrowUpRightIcon size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </footer>
    </main>
  )
}
