import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Tenant } from '@/payload-types'
import { isTenantEnabled, getDefaultTenantId, getDefaultDomain } from '@/shared/config/tenant'

async function getTenantByDomainUncached(domain: string): Promise<Tenant | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'tenants',
    where: { domain: { equals: domain } },
    limit: 1,
    depth: 0,
  })
  return result.docs[0] || null
}

async function getDefaultTenant(): Promise<Tenant | null> {
  const payload = await getPayload({ config: configPromise })
  try {
    const result = await payload.findByID({
      collection: 'tenants',
      id: getDefaultTenantId(),
      depth: 0,
    })
    return result as Tenant | null
  } catch {
    return null
  }
}

export const getTenantByDomain = cache(async (domain: string): Promise<Tenant | null> => {
  if (!isTenantEnabled()) {
    return await getDefaultTenant()
  }

  return unstable_cache(() => getTenantByDomainUncached(domain), ['tenant_by_domain', domain], {
    tags: [`tenant_${domain}`],
  })()
})

async function getDomainByTenantIdUncached(tenantId: number | string): Promise<string> {
  const payload = await getPayload({ config: configPromise })
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: String(tenantId),
    depth: 0,
  })
  return (tenant as Tenant)?.domain ?? ''
}

export function getDomainByTenantId(tenantId: number | string | null | undefined): Promise<string> {
  if (!isTenantEnabled()) {
    return Promise.resolve(getDefaultDomain())
  }

  if (!tenantId) return Promise.resolve('')
  const id = String(tenantId)
  return unstable_cache(() => getDomainByTenantIdUncached(id), ['tenant_domain', id], {
    tags: [`tenant_domain_${id}`],
  })()
}
