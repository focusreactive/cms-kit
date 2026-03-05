import type { CollectionAfterChangeHook } from 'payload'
import type { Header } from '@/payload-types'

import { getDomainFromGlobalDoc, revalidateGlobalTags } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/shared/lib/revalidatePageCache'

export const revalidateResourcesUsingHeader: CollectionAfterChangeHook<Header> = async ({
  doc,
  req,
}) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    const domain = await getDomainFromGlobalDoc(doc)

    const siteSettings = await payload.find({
      collection: 'site-settings',
      where: {
        header: {
          equals: doc.id,
        },
      },
    })

    if (siteSettings.docs.length > 0) {
      revalidateGlobalTags({ collection: 'site-settings', domain, locale })
      payload.logger?.info?.(`Revalidated site-settings for domain: ${domain}, locale: ${locale}`)
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
        tenant: true,
      },
    })

    for (const page of pages.docs) {
      revalidatePageCache({ doc: page, domain, locale, payload })
    }
  }

  return doc
}
