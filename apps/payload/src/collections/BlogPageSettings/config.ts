import type { CollectionConfig } from 'payload'

import { revalidateBlogPageSettings } from './hooks/revalidateBlogPageSettings'
import { tenantAdmin, anyone, or, user, superAdmin } from '@/shared/lib/access'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { beforeChangeUniqueTenant } from '@/hooks/beforeChangeUniqueTenant'
import { generateSeoFields } from '@/shared/lib/seoFields'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import { isTenantEnabled } from '@/shared/config/tenant'

export const BlogPageSettings: CollectionConfig<'blog-page-settings'> = {
  slug: 'blog-page-settings',
  access: {
    update: or(superAdmin, tenantAdmin, user),
    read: anyone,
    create: or(superAdmin),
    delete: or(superAdmin),
  },
  labels: {
    singular: {
      en: 'Blog page settings',
      es: 'Configuración de la página de blog',
    },
    plural: {
      en: 'Blog page settings',
      es: 'Configuración de la página de blog',
    },
  },
  admin: {
    group: 'Settings',
    defaultColumns: ['title', ...(isTenantEnabled() ? ['tenant'] : []), 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'General',
            es: 'General',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: createLocalizedDefault({ en: 'Blog', es: 'Blog' }),
              admin: {
                description: {
                  en: 'The main title for the blog page',
                  es: 'El título principal para la página de blog',
                },
              },
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: {
                  en: 'Description of the blog page (used for meta description if not overridden)',
                  es: 'Descripción de la página de blog (usada para la descripción meta si no se sobreescribe)',
                },
              },
              localized: true,
              defaultValue: createLocalizedDefault({
                en: 'Blog page description',
                es: 'Descripción de la página de blog',
              }),
            },
          ],
        },
        {
          name: 'meta',
          label: {
            en: 'SEO',
            es: 'SEO',
          },
          fields: generateSeoFields(),
          localized: true,
        },
      ],
    },
    ...tenantFields({ collection: 'blog-page-settings' }),
  ],
  hooks: {
    beforeChange: [beforeChangeTenant, beforeChangeUniqueTenant],
    afterChange: [revalidateBlogPageSettings],
  },
  versions: {
    maxPerDoc: 50,
    drafts: true,
  },
}
