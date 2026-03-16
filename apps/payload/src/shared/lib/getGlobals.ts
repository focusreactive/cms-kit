import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { revalidateTag, unstable_cache } from 'next/cache'
import { Locale } from '@/shared/types'
import { resolveLocale } from './resolveLocale'

type GlobalSlug = 'site-settings'

export function formatGlobalCacheTag(
  collection: GlobalSlug,
  domain: string,
  locale?: Locale,
): string {
  return `${collection}${domain ? `_${domain}` : ''}${locale ? `_${locale}` : ''}`
}

export function revalidateGlobalTags(params: {
  collection: GlobalSlug
  domain: string
  locale: Locale
}): void {
  const { collection, domain, locale } = params
  revalidateTag(formatGlobalCacheTag(collection, domain))
  revalidateTag(formatGlobalCacheTag(collection, domain, locale))
}

async function getGlobal(
  slug: GlobalSlug,
  depth = 0,
  locale?: Locale,
  draft?: boolean,
) {
  const payload = await getPayload({ config: configPromise })
  return await payload.findGlobal({
    slug,
    depth,
    draft,
    locale,
  })
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the collection
 */
export const getCachedGlobal = (
  collection: GlobalSlug,
  depth: number = 2,
  domain: string,
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
    [collection, String(depth), domain || '', locale || ''],
    {
      tags: [formatGlobalCacheTag(collection, domain, locale)],
    },
  )
}
