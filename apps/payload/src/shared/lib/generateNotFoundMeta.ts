import { getSiteSettings } from './getSiteSettings'
import { Metadata } from 'next'
import { buildPageTitle } from './buildPageTitle'
import { Locale } from '../types'

export async function generateNotFoundMeta({
  locale,
}: {
  locale: Locale
}): Promise<Metadata> {
  const settings = await getSiteSettings({ locale })

  const baseTitle = settings.notFoundTitle || '404 - Page not found'
  const description =
    settings.notFoundDescription ||
    'Unfortunately, the requested page does not exist or has been deleted.'
  const separator = settings.seoTitleSeparator || '|'
  const suffix = settings.seoTitleSuffix || (settings.siteName as string)
  const siteName = settings.siteName || 'Site'

  const title = buildPageTitle(baseTitle, separator, suffix, siteName)

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: '/',
    },
  }
}
