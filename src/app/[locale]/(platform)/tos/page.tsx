import type { Metadata, ResolvingMetadata } from 'next'

import { getExtracted } from 'next-intl/server'

import TermsOfServiceDocument from '@/components/TermsOfServiceDocument'
import { loadEnabledLocales } from '@/i18n/locale-settings'
import { resolveSupportedLocale } from '@/i18n/locales'
import { getRootLocale } from '@/i18n/root-locale'
import { SettingsRepository } from '@/lib/db/queries/settings'
import { TermsOfServiceRepository } from '@/lib/db/queries/terms-of-service'
import { buildLocalizedPageMetadata } from '@/lib/localized-page-seo'
import resolveSiteUrl from '@/lib/site-url'
import { getThemeSiteSettingsFormState, loadRuntimeThemeState } from '@/lib/theme-settings'

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [t, runtimeTheme, locale, enabledLocales, inherited] = await Promise.all([
    getExtracted(),
    loadRuntimeThemeState(),
    getRootLocale(),
    loadEnabledLocales(),
    parent,
  ])
  const siteName = runtimeTheme.site.name

  return buildLocalizedPageMetadata({
    path: '/tos',
    locale,
    enabledLocales,
    inherited,
    siteUrl: resolveSiteUrl(process.env),
    title: t('Terms of Use'),
    description: t(`Terms of Use for {siteName}`, { siteName }),
  })
}

export default async function TermsOfUsePage({ params }: PageProps<'/[locale]/tos'>) {
  const { locale } = await params
  const t = await getExtracted()

  const [{ data: allTermsOfServiceTranslations }, { data: allSettings }] = await Promise.all([
    TermsOfServiceRepository.getTranslations(),
    SettingsRepository.getSettings(),
  ])
  const siteSettings = getThemeSiteSettingsFormState(allSettings ?? undefined)
  const siteName = siteSettings.siteName
  const content = allTermsOfServiceTranslations?.[resolveSupportedLocale(locale)] ?? ''

  return (
    <main className="container mx-auto max-w-4xl py-12">
      {content ? (
        <TermsOfServiceDocument content={content} siteName={siteName} siteUrl={resolveSiteUrl(process.env)} />
      ) : (
        <div role="alert" className="space-y-4">
          <h1 className="text-3xl font-bold">{t('Terms of Use')}</h1>
          <p className="text-muted-foreground">
            {t('Terms of Use content is temporarily unavailable. Please try again later.')}
          </p>
        </div>
      )}
    </main>
  )
}
