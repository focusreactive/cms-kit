import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const DEFAULT_MEDIA_CACHE_TAG = 'default-media'
const REVALIDATE_SEC = 60

async function fetchDefaultMediaId(slot: string): Promise<string | number | null> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'media',
    where: {
      defaultFor: { contains: slot },
    },
    limit: 1,
    depth: 0,
  })
  return docs[0]?.id ?? null
}

export async function getDefaultMediaId(slot: string): Promise<string | number | null> {
  const cacheKey = `default-media-${slot}`
  return unstable_cache(() => fetchDefaultMediaId(slot), [cacheKey], {
    revalidate: REVALIDATE_SEC,
    tags: [DEFAULT_MEDIA_CACHE_TAG],
  })()
}
