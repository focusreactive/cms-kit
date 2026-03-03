import type { CollectionConfig } from 'payload'
import { anyone, tenantAdmin, or, user, superAdmin } from '@/shared/lib/access'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { isTenantEnabled } from '@/shared/config/tenant'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: {
    singular: {
      en: 'Testimonial',
      es: 'Testimonio',
    },
    plural: {
      en: 'Testimonials',
      es: 'Testimonios',
    },
  },
  access: {
    create: or(superAdmin, tenantAdmin, user),
    delete: or(superAdmin, tenantAdmin, user),
    read: anyone,
    update: or(superAdmin, tenantAdmin, user),
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: [
      'author',
      'company',
      'rating',
      ...(isTenantEnabled() ? ['tenant'] : []),
      'createdAt',
    ],
    group: 'Collections',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: {
        en: 'Author',
        es: 'Autor',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: {
        en: 'Company',
        es: 'Empresa',
      },
    },
    {
      name: 'position',
      type: 'text',
      label: {
        en: 'Position',
        es: 'Posición',
      },
      localized: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Avatar',
        es: 'Avatar',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: {
        en: 'Review',
        es: 'Reseña',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      label: {
        en: 'Rating (1-5)',
        es: 'Calificación (1-5)',
      },
    },
    ...tenantFields({ collection: 'testimonials' }),
  ],
  timestamps: true,
  hooks: {
    beforeChange: [beforeChangeTenant],
  },
}
