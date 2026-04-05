import { imageField } from '@/fields/imageField'
import { link } from '@/fields/link'
import { Field } from 'payload'

export const logosFields: Field[] = [
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
    localized: true,
    fields: [imageField(), link({ appearances: false })],
  },
]
