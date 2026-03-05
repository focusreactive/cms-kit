import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

export const DEFAULT_MEDIA_CACHE_TAG = 'default-media'
const REVALIDATE_SEC = 60

async function fetchDefaultMediaId(
  slot: string,
  tenantId: string | null,
): Promise<string | number | null> {
  const payload = await getPayload({ config: configPromise })

  const effectiveTenantId = isTenantEnabled() ? tenantId : tenantId || String(getDefaultTenantId())

  const { docs } = await payload.find({
    collection: 'media',
    where: {
      defaultFor: { contains: slot },
      ...(effectiveTenantId && { tenant: { equals: effectiveTenantId } }),
    },
    limit: 1,
    depth: 0,
  })
  return docs[0]?.id ?? null
}

export async function getDefaultMediaId(
  slot: string,
  tenantId?: string,
): Promise<string | number | null> {
  const cacheKey = `default-media-${slot}-${tenantId ?? 'global'}`
  return unstable_cache(() => fetchDefaultMediaId(slot, tenantId ?? null), [cacheKey], {
    revalidate: REVALIDATE_SEC,
    tags: [DEFAULT_MEDIA_CACHE_TAG],
  })()
}
