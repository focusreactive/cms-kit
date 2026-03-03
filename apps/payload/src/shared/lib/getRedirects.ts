import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { getTenantByDomain } from '@/shared/lib/getTenantByDomain'
import { Locale } from '../types'
import { cacheTag } from './cacheTags'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

export async function getRedirects(domain: string, locale: Locale) {
  const payload = await getPayload({ config: configPromise })

  let tenantId: number | null = null

  if (isTenantEnabled()) {
    const tenant = await getTenantByDomain(domain)
    if (!tenant) return []
    tenantId = tenant.id
  } else {
    tenantId = getDefaultTenantId()
  }

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    where: tenantId !== null ? { tenant: { equals: tenantId } } : {},
    depth: 2,
    limit: 0,
    locale,
    pagination: false,
  })

  return redirects
}

export const getCachedRedirects = ({ domain, locale }: { domain: string; locale: Locale }) =>
  unstable_cache(async () => getRedirects(domain, locale), ['redirects', domain, locale], {
    tags: ['redirects', `redirects_${domain}`, cacheTag({ type: 'redirect', domain, locale })],
  })
