import type { CollectionAfterChangeHook, CollectionSlug } from 'payload'
import type { SiteSetting } from '@/payload-types'

import { getDomainFromGlobalDoc, revalidateGlobalTags } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'

const collection: CollectionSlug = 'site-settings'

export const revalidateSiteSettings: CollectionAfterChangeHook<SiteSetting> = async ({
  doc,
  req,
}) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    const domain = await getDomainFromGlobalDoc(doc)
    revalidateGlobalTags({ collection, domain, locale })
    payload.logger?.info?.(`Revalidated ${collection} for domain: ${domain}, locale: ${locale}`)
  }

  return doc
}
