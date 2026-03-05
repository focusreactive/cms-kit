import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { link } from '@/fields/link'

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  ...getBlockPreviewImage('Logos'),
  labels: {
    singular: { en: 'Logos', es: 'Logos' },
    plural: { en: 'Logos', es: 'Logos' },
  },
  fields: [
    {
      name: 'alignVariant',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: { en: 'Left', es: 'Izquierda' }, value: 'left' },
        { label: { en: 'Center', es: 'Centro' }, value: 'center' },
        { label: { en: 'Right', es: 'Derecha' }, value: 'right' },
      ],
      label: { en: 'Alignment', es: 'Alineación' },
    },
    {
      name: 'items',
      type: 'array',
      label: { en: 'Logo Items', es: 'Logos' },
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Logo Image', es: 'Imagen del logo' },
        },
        link({ appearances: false }),
      ],
    },
  ],
}
