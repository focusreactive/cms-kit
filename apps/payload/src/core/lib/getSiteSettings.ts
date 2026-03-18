import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/core/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export const getSiteSettings = async ({
  locale,
}: {
  locale?: Locale
}): Promise<SiteSetting> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  return await getCachedGlobal('site-settings', 2, resolvedLocale, draft)()
}
