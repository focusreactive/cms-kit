import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/shared/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export const getSiteSettings = async ({
  locale,
  domain,
}: {
  locale?: Locale
  domain: string
}): Promise<SiteSetting> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  return await getCachedGlobal('site-settings', 2, domain, resolvedLocale, draft)()
}
