import { User } from '@/payload-types'

export function extractTenantId(tenant: User['tenant']) {
  if (typeof tenant === 'object' && tenant !== null && 'id' in tenant) {
    return tenant.id
  }

  return tenant as number | undefined
}
