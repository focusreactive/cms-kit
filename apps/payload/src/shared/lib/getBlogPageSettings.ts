import type { BlogPageSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/shared/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export const getBlogPageSettings = async ({
  locale,
  domain,
}: {
  locale?: Locale
  domain: string
}): Promise<BlogPageSetting> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  return (await getCachedGlobal(
    'blog-page-settings',
    1,
    domain,
    resolvedLocale,
    draft,
  )()) as BlogPageSetting
}
