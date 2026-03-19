import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { revalidateTag, unstable_cache } from 'next/cache'
import { Locale } from '@/core/types'
import { resolveLocale } from './resolveLocale'

type GlobalSlug = 'site-settings'

export function formatGlobalCacheTag(collection: GlobalSlug, locale?: Locale): string {
  return `${collection}${locale ? `_${locale}` : ''}`
}

export function revalidateGlobalTags(params: { collection: GlobalSlug; locale: Locale }): void {
  const { collection, locale } = params
  revalidateTag(formatGlobalCacheTag(collection))
  revalidateTag(formatGlobalCacheTag(collection, locale))
}

async function getGlobal(slug: GlobalSlug, depth = 0, locale?: Locale, draft?: boolean) {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({ slug, depth, draft, locale })
}

export const getCachedGlobal = (
  collection: GlobalSlug,
  depth: number = 2,
  locale?: Locale,
  draft?: boolean,
) => {
  if (draft) {
    return async () => {
      const resolvedLocale = locale ? await resolveLocale(locale) : undefined
      return getGlobal(collection, depth, resolvedLocale, true)
    }
  }

  return unstable_cache(
    async () => {
      const resolvedLocale = locale ? await resolveLocale(locale) : undefined
      return getGlobal(collection, depth, resolvedLocale)
    },
    [collection, String(depth), locale || ''],
    {
      tags: [formatGlobalCacheTag(collection, locale)],
    },
  )
}
