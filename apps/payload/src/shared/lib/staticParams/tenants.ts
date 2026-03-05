import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type TenantStaticParam = { id: number; domain: string }

export async function getAllTenantDomains(): Promise<TenantStaticParam[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'tenants',
    select: { id: true, domain: true },
    limit: 1000,
    pagination: false,
    overrideAccess: true,
  })

  return result.docs.map((doc) => ({
    id: doc.id as number,
    domain: doc.domain as string,
  }))
}
