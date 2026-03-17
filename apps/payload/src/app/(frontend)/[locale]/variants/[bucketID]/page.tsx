import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { generateMeta } from '@/shared/lib/generateMeta'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { I18N_CONFIG } from '@/shared/config/i18n'
import type { Page } from '@/payload-types'
import type { Locale } from '@/shared/types'
import { findPageVariantBySlug } from '@/shared/lib/page/findPageVariantBySlug'

interface Props {
  params: Promise<{
    locale: Locale
    bucketID: string
  }>
}

export { default } from './[...slug]/page'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, bucketID } = await params
  const { isEnabled: draft } = await draftMode()

  const variant = await findPageVariantBySlug({ bucketID, slug: [], locale, draft })
  if (!variant) return generateNotFoundMeta({ locale })

  const parentPage = typeof variant.page === 'object' ? (variant.page as Page) : null

  const docForMeta: Partial<Page> = {
    ...(parentPage ?? {}),
    meta: { ...(parentPage?.meta ?? {}), ...(variant.meta ?? {}) } as Page['meta'],
  }

  return generateMeta({ doc: docForMeta, collection: 'page', locale })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const { docs: variants } = await payload.find({
    collection: 'page-variants',
    depth: 2,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
  })

  const locales = I18N_CONFIG.locales.map((l) => l.code as Locale)
  const results: Array<{ locale: string; bucketID: string }> = []

  for (const variant of variants) {
    const page = typeof variant.page === 'object' ? (variant.page as Page) : null
    if (!page) continue

    for (const locale of locales) {
      const localePage = await payload.findByID({
        collection: 'page',
        id: page.id,
        depth: 0,
        locale: locale as any,
        overrideAccess: true,
        select: { breadcrumbs: true },
      })

      const breadcrumbs = (localePage as any)?.breadcrumbs ?? []
      const lastUrl: string = breadcrumbs[breadcrumbs.length - 1]?.url ?? ''
      const isHome = !lastUrl || lastUrl === '/home' || lastUrl === '/'
      if (!isHome) continue

      results.push({ locale, bucketID: variant.bucketID as string })
    }
  }

  return results
}
