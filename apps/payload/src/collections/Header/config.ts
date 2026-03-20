import type { CollectionConfig } from 'payload'

import { anyone, or, user, superAdmin } from '@/core/lib/access'
import { link } from '@/fields/link'
import { createLocalizedDefault } from '@/core/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/core/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/core/constants/mediaDefaults'
import { revalidateResourcesUsingHeader } from './hooks/revalidateResourcesUsingHeader'

export const Header: CollectionConfig<'header'> = {
  slug: 'header',
  access: {
    read: anyone,
    create: or(superAdmin, user),
    delete: or(superAdmin, user),
    update: or(superAdmin, user),
  },
  labels: {
    singular: {
      en: 'Header',
      es: 'Header',
    },
    plural: {
      en: 'Headers',
      es: 'Headers',
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
      localized: true,
      admin: {
        description: {
          en: 'The name of the header',
          es: 'El nombre del header',
        },
      },
      defaultValue: createLocalizedDefault({ en: 'Header', es: 'Header' }),
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: {
          en: 'The logo to display in the header',
          es: 'El logo a mostrar en el header',
        },
      },
      defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
    },
    {
      name: 'navItems',
      localized: true,
      type: 'array',
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
      maxRows: 6,
      admin: {
        description: {
          en: 'Navigation items in the header (up to 6 items)',
          es: 'Items de navegación en el header (hasta 6 items)',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/core/ui/components/RowLabel#RowLabelGroupName',
        },
      },
      defaultValue: createLocalizedDefault({
        en: [
          { link: { type: 'custom', url: '#', label: 'Link 1', newTab: false } },
          { link: { type: 'custom', url: '#', label: 'Link 2', newTab: false } },
        ],
        es: [
          { link: { type: 'custom', url: '#', label: 'Enlace 1', newTab: false } },
          { link: { type: 'custom', url: '#', label: 'Enlace 2', newTab: false } },
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateResourcesUsingHeader],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
