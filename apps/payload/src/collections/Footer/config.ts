import type { CollectionConfig } from 'payload'
import { tenantAdmin, anyone, or, user, superAdmin } from '@/shared/lib/access'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import { link } from '@/fields/link'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/shared/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/shared/constants/mediaDefaults'
import type { Locale } from '@/shared/types'
import { revalidateResourcesUsingFooter } from './hooks/revalidateResourcesUsingFooter'
import { isTenantEnabled } from '@/shared/config/tenant'

const footerNavGroup = (groupName: string, linkLabel: string) => ({
  groupName,
  links: [{ link: { type: 'custom' as const, url: '#', label: linkLabel, newTab: false } }],
})

const DEFAULT_FOOTER_NAV_ITEMS = {
  en: [footerNavGroup('Group name', 'Link'), footerNavGroup('Group name', 'Link')],
  es: [footerNavGroup('Nombre del grupo', 'Enlace'), footerNavGroup('Nombre del grupo', 'Enlace')],
} satisfies Record<Locale, ReturnType<typeof footerNavGroup>[]>

export const Footer: CollectionConfig<'footer'> = {
  slug: 'footer',
  access: {
    read: anyone,
    create: or(superAdmin, tenantAdmin, user),
    delete: or(superAdmin, tenantAdmin, user),
    update: or(superAdmin, tenantAdmin, user),
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
    defaultColumns: ['name', 'logo', ...(isTenantEnabled() ? ['tenant'] : [])],
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
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: true,
          admin: {
            description: {
              en: 'Footer links group name',
              es: 'Nombre del grupo de enlaces del footer',
            },
          },
          defaultValue: createLocalizedDefault({ en: 'Group name', es: 'Nombre del grupo' }),
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          localized: true,
          fields: [
            link({
              appearances: false,
            }),
          ],
          minRows: 1,
          maxRows: 10,
          admin: {
            description: {
              en: 'Links in this group (up to 10 items)',
              es: 'Enlaces en este grupo (hasta 10 items)',
            },
          },
        },
      ],
      minRows: 2,
      maxRows: 4,
      admin: {
        description: {
          en: 'Footer navigation link groups (2 to 4 groups)',
          es: 'Grupos de enlaces de navegación del footer (2 a 4 grupos)',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/shared/ui/components/RowLabel#RowLabelGroupName',
        },
      },
      defaultValue: createLocalizedDefault(DEFAULT_FOOTER_NAV_ITEMS),
    },
    ...tenantFields({ collection: 'footer' }),
  ],
  hooks: {
    beforeChange: [beforeChangeTenant],
    afterChange: [revalidateResourcesUsingFooter],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
