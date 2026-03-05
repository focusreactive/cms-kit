import { CollectionSlug, Condition, Field } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { superAdmin } from '@/shared/lib/access'
import { isTenantEnabled } from '@/shared/config/tenant'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {
    read: () => true,
  },
})

const condition =
  (collection: CollectionSlug) =>
  (...args: Parameters<Condition>) => {
    const [data, _siblingData, { user }] = args

    if (!user) return false

    if (collection === 'users') {
      if (superAdmin({ req: { user } }) && user.id === data.id) return false

      return true
    }

    return superAdmin({ req: { user } })
  }

export const tenantFields = ({ collection }: { collection: CollectionSlug }): Field[] => {
  // Always render fields (to keep TypeScript types in sync)
  // In single-tenant mode, fields are hidden in UI but still exist in DB

  return [
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        hidden: true,
        condition: condition(collection),
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      label: {
        en: 'Tenant',
        es: 'Tenant',
      },
      required: true,
      admin: {
        position: 'sidebar',
        hidden: !isTenantEnabled(),
        condition: condition(collection),
      },
      access: {
        read: () => true,
        create: ({ req: { user } }) => {
          if (!user) return false
          if (superAdmin({ req: { user } })) return true

          return false
        },
        update: ({ req: { user } }) => {
          if (!user) return false
          if (superAdmin({ req: { user } })) return true

          return false
        },
      },
    },
  ]
}
