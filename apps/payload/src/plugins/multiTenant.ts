import { superAdmin } from '@/shared/lib/access'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { CollectionSlug } from 'payload'
import { isTenantEnabled } from '@/shared/config/tenant'

const collections: CollectionSlug[] = [
  'users',
  'page',
  'media',
  'categories',
  'authors',
  'posts',
  'testimonials',
  'presets',
  'redirects',
  'site-settings',
  'header',
  'footer',
]

const generateCollectionsConfig = () => {
  return collections.reduce(
    (acc, collection) => {
      const isUsers = collection === 'users'

      acc[collection as CollectionSlug] = {
        customTenantField: true,
        useBaseFilter: !isUsers,
        useBaseListFilter: !isUsers,
        useTenantAccess: false,
      }

      return acc
    },
    {} as Record<CollectionSlug, Record<string, boolean | undefined>>,
  )
}

export const multiTenant = multiTenantPlugin({
  enabled: true,
  i18n: {
    translations: {
      en: {
        'assign-tenant-button-label': 'Assign Tenant',
        'assign-tenant-modal-title': 'Assign Tenant',
        'field-assignedTenant-label': 'Assigned Tenant',
        'nav-tenantSelector-label': 'Tenant',
      },
      es: {
        'assign-tenant-button-label': 'Asignar Tenant',
        'assign-tenant-modal-title': 'Asignar Tenant',
        'field-assignedTenant-label': 'Tenant asignado',
        'nav-tenantSelector-label': 'Tenant',
      },
    },
  },
  userHasAccessToAllTenants: (_user) => {
    if (!_user) return false
    return superAdmin({ req: { user: _user } }) as boolean
  },
  useTenantsCollectionAccess: false,
  useUsersTenantFilter: isTenantEnabled(), // In single-tenant mode don't filter
  useTenantsListFilter: isTenantEnabled(), // In single-tenant mode don't filter

  collections: generateCollectionsConfig(),
  tenantSelectorLabel: {
    en: 'Tenant',
    es: 'Tenant',
  },
  tenantsArrayField: {
    includeDefaultField: false,
  },
})
