import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { cacheTag } from '@/shared/lib/cacheTags'

const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)
    const locale = getLocaleFromRequest(req)

    revalidateTag(cacheTag({ type: 'redirect', domain: DEFAULT_DOMAIN, locale }))
    payload.logger.info(`Revalidated redirects for domain: ${DEFAULT_DOMAIN}, locale: ${locale}`)
  }

  return doc
}
