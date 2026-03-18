import type { CollectionConfig } from 'payload'

import { anyone, or, user, superAdmin } from '@/core/lib/access'
import { link } from '@/fields/link'
import { createLocalizedDefault } from '@/core/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/core/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/core/constants/mediaDefaults'
import type { Locale } from '@/core/types'
import { revalidateResourcesUsingHeader } from './hooks/revalidateResourcesUsingHeader'

const navLink = (label: string) => ({
  type: 'link' as const,
  link: { type: 'custom' as const, url: '#', label, newTab: false },
})

const navGroup = (groupName: string, linkLabels: string[]) => ({
  type: 'links_group' as const,
  groupName,
  links: linkLabels.map((label) => ({
    link: { type: 'custom' as const, url: '#', label, newTab: false },
  })),
})

const DEFAULT_HEADER_NAV_ITEMS = {
  en: [navLink('Link 1'), navGroup('Dropdown', ['Link A', 'Link B']), navLink('Link 2')],
  es: [navLink('Enlace 1'), navGroup('Desplegable', ['Enlace A', 'Enlace B']), navLink('Enlace 2')],
} satisfies Record<Locale, (ReturnType<typeof navLink> | ReturnType<typeof navGroup>)[]>

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
        {
          name: 'type',
          type: 'select',
          defaultValue: 'link',
          required: true,
          options: [
            {
              label: {
                en: 'Link',
                es: 'Enlace',
              },
              value: 'link',
            },
            {
              label: {
                en: 'Links group',
                es: 'Grupo de enlaces',
              },
              value: 'links_group',
            },
          ],
          admin: {
            description: {
              en: 'Navigation item type: single link or links group',
              es: 'Tipo de item de navegación: enlace único o grupo de enlaces',
            },
          },
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, data) => data.type === 'link',
              description: {
                en: 'Link settings',
                es: 'Configuración del enlace',
              },
            },
          },
        }),
        {
          name: 'groupName',
          type: 'text',
          admin: {
            condition: (_, data) => data.type === 'links_group',
            description: {
              en: 'Group name for dropdown menu display',
              es: 'Nombre del grupo para el menú desplegable',
            },
          },
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            condition: (_, data) => data.type === 'links_group',
            description: {
              en: 'Links in the dropdown menu (up to 10 items)',
              es: 'Enlaces en el menú desplegable (hasta 10 items)',
            },
          },
          minRows: 1,
          maxRows: 10,
        },
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
      defaultValue: createLocalizedDefault(DEFAULT_HEADER_NAV_ITEMS),
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
