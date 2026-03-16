import type { CollectionAfterChangeHook } from 'payload'
import type { Header } from '@/payload-types'
import { revalidateGlobalTags } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/shared/lib/revalidatePageCache'

const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export const revalidateResourcesUsingHeader: CollectionAfterChangeHook<Header> = async ({
  doc,
  req,
}) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    const headerId = typeof siteSettings?.header === 'object' ? siteSettings.header?.id : siteSettings?.header
    if (headerId === doc.id) {
      revalidateGlobalTags({ collection: 'site-settings', domain: DEFAULT_DOMAIN, locale })
      payload.logger?.info?.(`Revalidated site-settings for locale: ${locale}`)
    }

    const pages = await payload.find({
      collection: 'page',
      where: {
        header: {
          equals: doc.id,
        },
      },
      select: {
        id: true,
        breadcrumbs: true,
      },
    })

    for (const page of pages.docs) {
      revalidatePageCache({ doc: page, domain: DEFAULT_DOMAIN, locale, payload })
    }
  }

  return doc
}
