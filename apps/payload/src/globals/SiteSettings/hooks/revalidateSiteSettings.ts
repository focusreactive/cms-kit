import type { GlobalAfterChangeHook } from 'payload'

import { revalidateGlobalTags } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'

export const revalidateSiteSettings: GlobalAfterChangeHook = async ({ doc, req }) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    revalidateGlobalTags({ collection: 'site-settings', locale })
    payload.logger?.info?.(`Revalidated site-settings for locale: ${locale}`)
  }

  return doc
}
