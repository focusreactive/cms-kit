import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { getLocaleFromRequest } from '@/core/lib/getLocaleFromRequest'
import { cacheTag } from '@/core/lib/cacheTags'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)
    const locale = getLocaleFromRequest(req)

    revalidateTag(cacheTag({ type: 'redirect', locale }))
    payload.logger.info(`Revalidated redirects for locale: ${locale}`)
  }

  return doc
}
