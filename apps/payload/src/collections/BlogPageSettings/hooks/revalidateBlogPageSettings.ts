import type { CollectionAfterChangeHook } from 'payload'
import type { BlogPageSetting } from '@/payload-types'

import { getDomainFromGlobalDoc, revalidateGlobalTags } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { CollectionSlug } from 'payload'

const collection: CollectionSlug = 'blog-page-settings'

export const revalidateBlogPageSettings: CollectionAfterChangeHook<BlogPageSetting> = async ({
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
