import { Tenant } from '@/payload-types'
import { Payload } from 'payload'

export async function resolveDomainFromTenant(
  tenant: number | Tenant | null | undefined,
  payload: Payload,
): Promise<string> {
  if (!tenant) return ''

  if (typeof tenant === 'object' && tenant !== null && 'domain' in tenant) {
    return tenant.domain
  }

  if (typeof tenant === 'number') {
    try {
      const doc = await payload.findByID({
        collection: 'tenants',
        id: tenant,
        depth: 0,
        overrideAccess: true,
      })

      return doc.domain
    } catch (error) {
      console.error(`Failed to get tenant with id ${tenant}:`, error)
    }
  }

  return ''
}
