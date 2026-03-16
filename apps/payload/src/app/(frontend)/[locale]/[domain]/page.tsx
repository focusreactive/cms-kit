import type { Metadata } from 'next'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getPageBySlug } from '@/shared/lib/getPageBySlug'
import type { Locale } from '@/shared/types'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export { default } from './[...slug]/page'

type Props = { params: Promise<{ locale: Locale; domain: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, domain } = await params
  const page = await getPageBySlug(['home'], domain, locale)
  if (!page) return generateNotFoundMeta({ locale, domain })
  return generateMeta({ doc: page, collection: 'page', locale, domain })
}

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({
    locale: locale.code,
    domain: DEFAULT_DOMAIN,
  }))
}
