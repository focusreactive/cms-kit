import type { Metadata } from 'next'
import { generateMeta } from '@/shared/lib/generateMeta'
import { getPageBySlug } from '@/shared/lib/getPageBySlug'
import type { Locale } from '@/shared/types'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { getAllTenantDomains } from '@/shared/lib/staticParams/tenants'
import { isTenantEnabled, getDefaultDomain } from '@/shared/config/tenant'

export { default } from './[...slug]/page'

type Props = { params: Promise<{ locale: Locale; domain: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, domain } = await params
  const page = await getPageBySlug(['home'], domain, locale)
  if (!page) return generateNotFoundMeta({ locale, domain })
  return generateMeta({ doc: page, collection: 'page', locale, domain })
}

export async function generateStaticParams() {
  if (!isTenantEnabled()) {
    return I18N_CONFIG.locales.map((locale) => ({
      locale: locale.code,
      domain: getDefaultDomain(),
    }))
  }

  const tenants = await getAllTenantDomains()
  return I18N_CONFIG.locales.flatMap((locale) =>
    tenants.map((t) => ({ locale: locale.code, domain: t.domain })),
  )
}
