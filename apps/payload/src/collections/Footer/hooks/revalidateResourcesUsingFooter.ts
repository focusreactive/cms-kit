import type { CollectionAfterChangeHook } from 'payload'
import type { Footer } from '@/payload-types'
import { revalidateGlobalTags } from '@/core/lib/getGlobals'
import { getLocaleFromRequest } from '@/core/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/core/lib/revalidatePageCache'

export const revalidateResourcesUsingFooter: CollectionAfterChangeHook<Footer> = async ({
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

    const footerId = typeof siteSettings?.footer === 'object' ? siteSettings.footer?.id : siteSettings?.footer
    if (footerId === doc.id) {
      revalidateGlobalTags({ collection: 'site-settings', locale })
      payload.logger?.info?.(`Revalidated site-settings for locale: ${locale}`)
    }

    const pages = await payload.find({
      collection: 'page',
      where: {
        footer: {
          equals: doc.id,
        },
      },
      select: {
        id: true,
        breadcrumbs: true,
      },
    })

    for (const page of pages.docs) {
      revalidatePageCache({ doc: page, locale, payload })
    }
  }

  return doc
}
