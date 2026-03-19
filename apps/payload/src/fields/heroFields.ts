import type { Field, GroupField } from 'payload'
import { createLocalizedDefault, createLocalizedRichText } from '@/core/lib/createLocalizedDefault'
import { generateRichText } from '@/core/lib/generateRichText'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'
import { link } from '@/fields/link'
import { imageField } from '@/fields/imageField'

const defaultHeroLinkItem = (label: string) => ({
  type: 'custom' as const,
  url: 'https://www.google.com',
  label,
  newTab: false,
  appearance: 'default' as const,
})

export const heroFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: { en: 'Title', es: 'Título' },
    localized: true,
    defaultValue: createLocalizedDefault(
      DEFAULT_VALUES.blocks.hero.title ?? { en: 'Hero Title', es: 'Título Hero' },
    ),
  },
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
        RowLabel: '@/core/ui/components/RowLabel#RowLabel',
      },
    },
    fields: (link() as GroupField).fields,
    defaultValue: createLocalizedDefault({
      en: [defaultHeroLinkItem('Learn more')],
      es: [defaultHeroLinkItem('Saber más')],
    }),
  },
  imageField('image', { withDefaultMedia: true }),
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
