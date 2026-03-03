import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { revalidateTag, unstable_cache } from 'next/cache'
import { Locale } from '@/shared/types'
import { resolveLocale } from './resolveLocale'
import { getDomainByTenantId, getTenantByDomain } from './getTenantByDomain'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

type GlobalCollection = 'site-settings'

export function formatGlobalCacheTag(
  collection: GlobalCollection,
  domain: string,
  locale?: Locale,
): string {
  if (!isTenantEnabled()) {
    return `${collection}${locale ? `_${locale}` : ''}`
  }

  return `${collection}_${domain}${locale ? `_${locale}` : ''}`
}

export function revalidateGlobalTags(params: {
  collection: GlobalCollection
  domain: string
  locale: Locale
}): void {
  const { collection, domain, locale } = params
  revalidateTag(formatGlobalCacheTag(collection, domain))
  revalidateTag(formatGlobalCacheTag(collection, domain, locale))
}

export async function getDomainFromGlobalDoc(doc: {
  tenant?: number | { id?: number; domain?: string } | null
}): Promise<string> {
  const tenant = doc?.tenant
  if (!tenant) return ''
  if (
    typeof tenant === 'object' &&
    tenant !== null &&
    'domain' in tenant &&
    typeof tenant.domain === 'string'
  ) {
    return tenant.domain
  }
  if (typeof tenant === 'number') {
    const domain = await getDomainByTenantId(tenant)
    return domain
  }
  return ''
}

async function getGlobal(
  collection: GlobalCollection,
  depth = 0,
  domain: string,
  locale?: Locale,
  draft?: boolean,
) {
  const payload = await getPayload({ config: configPromise })

  let tenantId: number | undefined
  if (isTenantEnabled()) {
    const tenantDoc = domain ? await getTenantByDomain(domain) : null
    tenantId = tenantDoc?.id
  } else {
    tenantId = getDefaultTenantId()
  }

  const result = await payload.find({
    collection,
    depth,
    draft,
    limit: 1,
    locale,
    where:
      tenantId && Number.isFinite(Number(tenantId))
        ? { tenant: { equals: tenantId } }
        : { tenant: { equals: null } },
  })

  return result.docs[0] || {}
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the collection
 */
export const getCachedGlobal = (
  collection: GlobalCollection,
  depth: number = 2,
  domain: string,
  locale?: Locale,
  draft?: boolean,
) => {
  if (draft) {
    return async () => {
      const resolvedLocale = locale ? await resolveLocale(locale) : undefined
      return getGlobal(collection, depth, domain, resolvedLocale, true)
    }
  }

  return unstable_cache(
    async () => {
      const resolvedLocale = locale ? await resolveLocale(locale) : undefined
      return getGlobal(collection, depth, domain, resolvedLocale)
    },
    [collection, String(depth), domain || '', locale || ''],
    {
      tags: [formatGlobalCacheTag(collection, domain, locale)],
    },
  )
}
