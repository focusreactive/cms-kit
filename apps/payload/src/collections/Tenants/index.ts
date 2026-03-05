import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { authenticated, superAdmin } from '@/shared/lib/access'
import { validateDomain, normalizeDomain, DOMAIN_MAX_LENGTH } from './validate'
import { afterCreateTenant } from './hooks/afterCreateTenant'
import { isTenantEnabled, getDefaultDomain } from '@/shared/config/tenant'
import { triggerVercelDeployAfterChange } from './hooks/triggerVercelDeployAfterChange'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: {
    singular: {
      en: 'Tenant',
      es: 'Tenant',
    },
    plural: {
      en: 'Tenants',
      es: 'Tenants',
    },
  },
  access: {
    create: superAdmin,
    read: authenticated,
    update: superAdmin,
    delete: superAdmin,
  },
  admin: {
    hidden: !isTenantEnabled(),
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt'],
    group: 'Collections',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      maxLength: DOMAIN_MAX_LENGTH,
      validate: (val: string | undefined | null) => validateDomain(val),
      admin: {
        description: {
          en: `Used for domain, [domain].site.com. Only Latin letters, numbers, hyphens; spaces are replaced with hyphen.`,
          es: `Utilizado para el dominio, [domain].site.com. Solo letras latinas, números, guiones; los espacios se reemplazan por guión.`,
        },
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value != null && typeof value === 'string') {
              return normalizeDomain(value)
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, originalDoc, operation }) => {
        // Prevent changing the domain of the default tenant (used in config)
        if (operation === 'update' && originalDoc?.domain === getDefaultDomain()) {
          data.domain = originalDoc.domain
        }
        return data
      },
    ],
    afterChange: [
      afterCreateTenant,
      triggerVercelDeployAfterChange,
      ({ doc, context }) => {
        if (context?.disableRevalidate) return
        if (doc?.id) revalidateTag(`tenant_domain_${doc.id}`)
        if (doc?.domain) revalidateTag(`tenant_${doc.domain}`)
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const doc = await req.payload.findByID({
          collection: 'tenants',
          id: String(id),
          depth: 0,
        })
        if (doc?.domain) {
          req.context.deletedTenantDomain = doc.domain
        }
      },
    ],
    afterDelete: [
      ({ id, req }) => {
        if (id) revalidateTag(`tenant_domain_${id}`)
        const domain = (req.context as { deletedTenantDomain?: string })?.deletedTenantDomain
        if (domain) {
          revalidateTag(`tenant_${domain}`)
        }
      },
    ],
  },
}
