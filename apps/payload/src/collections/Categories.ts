import { anyone, author, or, superAdmin, user } from '@/shared/lib/access'
import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      es: 'Categoría',
    },
    plural: {
      en: 'Categories',
      es: 'Categorías',
    },
  },
  access: {
    create: or(superAdmin, user, author),
    delete: or(superAdmin, user, author),
    read: anyone,
    update: or(superAdmin, user, author),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    group: 'Blog',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        es: 'Título',
      },
      localized: true,
      defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.categories.title),
    },
    slugField({
      useAsSlug: 'title',
      required: true,
      overrides: (field) => {
        const slugSub = field.fields?.[1] as { unique?: boolean } | undefined
        if (slugSub && 'unique' in slugSub) slugSub.unique = false
        return field
      },
    }),
  ],
}
