import { extractTenantId } from '@/shared/lib/extractTenantId'
import { CollectionBeforeChangeHook, ValidationError } from 'payload'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

export const beforeChangeTenant: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!isTenantEnabled()) {
    if (!data.tenant) {
      data.tenant = getDefaultTenantId()
    }
    return data
  }

  if (data?.tenant) {
    const tenantId = extractTenantId(data.tenant)
    if (tenantId) {
      data.tenants = [{ tenant: tenantId }]
    } else {
      data.tenants = []
    }
  } else {
    const userTenant = extractTenantId(req.user?.tenant)
    if (userTenant) {
      data.tenants = [{ tenant: userTenant }]
      data.tenant = userTenant
    } else {
      const users = await req.payload.find({
        collection: 'users',
        limit: 1,
      })

      if (users.docs.length > 0) {
        throw new ValidationError({
          errors: [
            {
              path: 'tenant',
              message: 'Tenant is required',
            },
          ],
        })
      }
    }
  }

  return data
}
