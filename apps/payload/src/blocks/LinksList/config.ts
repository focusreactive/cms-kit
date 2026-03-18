import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { link } from '@/fields/link'

export const LinksListBlock: Block = {
  slug: 'linksList',
  interfaceName: 'LinksListBlock',
  ...getBlockPreviewImage('Links List'),
  labels: {
    singular: { en: 'Links List', es: 'Lista de enlaces' },
    plural: { en: 'Links Lists', es: 'Listas de enlaces' },
  },
  fields: [
    {
      name: 'alignVariant',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: { en: 'Left', es: 'Izquierda' }, value: 'left' },
        { label: { en: 'Center', es: 'Centro' }, value: 'center' },
        { label: { en: 'Right', es: 'Derecha' }, value: 'right' },
      ],
      label: { en: 'Alignment', es: 'Alineación' },
    },
    {
      name: 'links',
      type: 'array',
      label: { en: 'Links', es: 'Enlaces' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [link()],
    },
  ],
}
