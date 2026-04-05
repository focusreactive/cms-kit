import type { CollectionConfig } from 'payload'
import { anyone, or, user, superAdmin } from '@/core/lib/access'
import { link } from '@/fields/link'
import { createLocalizedDefault } from '@/core/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/core/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/core/constants/mediaDefaults'
import { revalidateResourcesUsingFooter } from './hooks/revalidateResourcesUsingFooter'

export const Footer: CollectionConfig<'footer'> = {
  slug: 'footer',
  access: {
    read: anyone,
    create: or(superAdmin, user),
    delete: or(superAdmin, user),
    update: or(superAdmin, user),
  },
  labels: {
    singular: {
      en: 'Footer',
      es: 'Pie de página',
    },
    plural: {
      en: 'Footers',
      es: 'Pie de página',
    },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Global Components',
    defaultColumns: ['name', 'logo'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: {
          en: 'The name of the footer',
          es: 'El nombre del footer',
        },
      },
      defaultValue: createLocalizedDefault({ en: 'Footer', es: 'Pie de página' }),
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: {
          en: 'The logo to display in the footer',
          es: 'El logo a mostrar en el footer',
        },
      },
      defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
    },
    {
      name: 'links',
      type: 'array',
      localized: true,
      fields: [
        link({
          appearances: false,
          overrides: {
            admin: {
              description: {
                en: 'Link settings',
                es: 'Configuración del enlace',
              },
            },
          },
        }),
      ],
      minRows: 1,
      maxRows: 10,
      admin: {
        description: {
          en: 'Footer navigation links (up to 10 items)',
          es: 'Enlaces de navegación del footer (hasta 10 items)',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/core/ui/components/RowLabel#RowLabelGroupName',
        },
      },
      defaultValue: createLocalizedDefault({
        en: [
          { link: { type: 'custom', url: '#', label: 'Link', newTab: false } },
          { link: { type: 'custom', url: '#', label: 'Link', newTab: false } },
        ],
        es: [
          { link: { type: 'custom', url: '#', label: 'Enlace', newTab: false } },
          { link: { type: 'custom', url: '#', label: 'Enlace', newTab: false } },
        ],
      }),
    },
    {
      name: 'text',
      type: 'richText',
      localized: true,
      admin: {
        description: {
          en: 'Footer body text',
          es: 'Texto del footer',
        },
      },
    },
    {
      name: 'copywriteText',
      type: 'text',
      localized: true,
      admin: {
        description: {
          en: 'Copyright text shown at the bottom',
          es: 'Texto de copyright al pie',
        },
      },
      defaultValue: createLocalizedDefault({
        en: '© 2025 All rights reserved',
        es: '© 2025 Todos los derechos reservados',
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateResourcesUsingFooter],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
