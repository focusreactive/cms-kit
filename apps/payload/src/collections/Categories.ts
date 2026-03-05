import { tenantFields } from '@/fields/tenantFields'
import { tenantAdmin, anyone, author, or, superAdmin, user } from '@/shared/lib/access'
import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'
import { createValidateSlugTenantUnique } from '@/shared/lib/validateSlugTenantUnique'
import { isTenantEnabled } from '@/shared/config/tenant'

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
    create: or(superAdmin, tenantAdmin, author, user),
    delete: or(superAdmin, tenantAdmin, author, user),
    read: anyone,
    update: or(superAdmin, tenantAdmin, author, user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', ...(isTenantEnabled() ? ['tenant'] : [])],
    group: 'Content',
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
      required: false,
      overrides: (field) => {
        const slugSub = field.fields?.[1] as { unique?: boolean } | undefined
        if (slugSub && 'unique' in slugSub) slugSub.unique = false
        return field
      },
    }),
    ...tenantFields({ collection: 'categories' }),
  ],
  hooks: {
    beforeChange: [beforeChangeTenant, createValidateSlugTenantUnique('categories')],
  },
}
