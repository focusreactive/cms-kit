import type { Metadata } from 'next'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getPageBySlug } from '@/shared/lib/getPageBySlug'
import type { Locale } from '@/shared/types'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'

export { default } from './[...slug]/page'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = await getPageBySlug(['home'], locale)
  if (!page) return generateNotFoundMeta({ locale })
  return generateMeta({ doc: page, collection: 'page', locale })
}

export async function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({
    locale: locale.code,
  }))
}
