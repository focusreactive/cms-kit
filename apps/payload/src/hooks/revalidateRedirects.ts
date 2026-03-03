import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { getDomainFromGlobalDoc } from '@/shared/lib/getGlobals'
import { cacheTag } from '@/shared/lib/cacheTags'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)
    const locale = getLocaleFromRequest(req)
    const domain = await getDomainFromGlobalDoc(doc)

    revalidateTag(cacheTag({ type: 'redirect', domain, locale }))
    payload.logger.info(`Revalidated redirects for domain: ${domain}, locale: ${locale}`)
  }

  return doc
}
