import type { CollectionConfig } from 'payload'
import { or, user, author, superAdmin } from '@/core/lib/access'

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
    defaultColumns: ['name', 'updatedAt'],
    pagination: {
      limits: [20, 50, 100],
    },
    group: 'Blog',
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
  ],
}
