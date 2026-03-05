import type { Field, GroupField } from 'payload'
import {
  createLocalizedDefault,
  createLocalizedRichText,
} from '@/shared/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/shared/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/shared/constants/mediaDefaults'
import { generateRichText } from '@/shared/lib/generateRichText'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'
import { link } from '@/fields/link'

const defaultHeroLinkItem = (label: string) => ({
  type: 'custom' as const,
  url: 'https://www.google.com',
  label,
  newTab: false,
  appearance: 'default' as const,
})

export const heroFields: Field[] = [
  {
    name: 'richText',
    type: 'richText',
    editor: generateRichText('hero'),
    label: { en: 'Rich Text', es: 'Texto enriquecido' },
    defaultValue: createLocalizedRichText(DEFAULT_VALUES.richText.text),
  },
  {
    name: 'actions',
    type: 'array',
    label: { en: 'Actions', es: 'Acciones' },
    maxRows: 2,
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '@/shared/ui/components/RowLabel#RowLabel',
      },
    },
    fields: (link() as GroupField).fields,
    defaultValue: createLocalizedDefault({
      en: [defaultHeroLinkItem('Learn more')],
      es: [defaultHeroLinkItem('Saber más')],
    }),
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
    label: { en: 'Media', es: 'Medio' },
    defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
  },
  {
    label: { en: 'Overlay', es: 'Overlay' },
    type: 'group',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        label: { en: 'Enabled', es: 'Habilitado' },
      },
      {
        name: 'color',
        type: 'select',
        defaultValue: 'black',
        options: [
          { label: { en: 'Black', es: 'Negro' }, value: 'black' },
          { label: { en: 'White', es: 'Blanco' }, value: 'white' },
        ],
        label: { en: 'Color', es: 'Color' },
      },
      {
        name: 'opacity',
        type: 'number',
        defaultValue: 40,
        min: 0,
        max: 100,
        admin: {
          description: { en: 'Overlay opacity (0-100)', es: 'Opacidad del overlay (0-100)' },
        },
        label: { en: 'Opacity', es: 'Opacidad' },
      },
    ],
  },
]
