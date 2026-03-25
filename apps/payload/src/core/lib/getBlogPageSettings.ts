import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/core/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export type BlogPageSettingsData = {
  readMoreLabel?: string | null
  relatedPostsLabel?: string | null
  blogMeta?: NonNullable<SiteSetting['blog']>['blogMeta']
}

export const getBlogPageSettings = async ({
  locale,
}: {
  locale?: Locale
}): Promise<BlogPageSettingsData> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  const settings = (await getCachedGlobal(
    'site-settings',
    1,
    resolvedLocale,
    draft,
  )()) as SiteSetting

  return {
    readMoreLabel: settings?.blog?.labels?.readMoreLabel,
    relatedPostsLabel: settings?.blog?.labels?.relatedPostsLabel,
    blogMeta: settings?.blog?.blogMeta,
  }
}
