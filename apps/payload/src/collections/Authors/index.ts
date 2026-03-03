import type { CollectionConfig } from 'payload'
import { or, user, author, superAdmin } from '@/shared/lib/access'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { isTenantEnabled } from '@/shared/config/tenant'

export const Authors: CollectionConfig<'authors'> = {
  slug: 'authors',
  labels: {
    singular: {
      en: 'Author',
      es: 'Autor',
    },
    plural: {
      en: 'Authors',
      es: 'Autores',
    },
  },
  access: {
    read: or(superAdmin, user, author, user),
    create: or(superAdmin, user, author, user),
    update: or(superAdmin, user, author, user),
    delete: or(superAdmin, user, author, user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', ...(isTenantEnabled() ? ['tenant'] : []), 'updatedAt'],
    pagination: {
      limits: [20, 50, 100],
    },
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        es: 'Nombre',
      },
      required: true,
      admin: {
        description: {
          en: 'The name of the author',
          es: 'El nombre del autor',
        },
      },
    },
    ...tenantFields({ collection: 'authors' }),
  ],
  hooks: {
    beforeChange: [beforeChangeTenant],
  },
}
