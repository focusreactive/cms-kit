import { link } from '@/fields/link'
import { Field } from 'payload'

export const linksListFields: Field[] = [
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
]
