import type { Block } from 'payload'
import { link } from '@/fields/link'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'

export const CardsGridBlock: Block = {
  slug: 'cardsGrid',
  interfaceName: 'CardsGridBlock',
  ...getBlockPreviewImage('Cards Grid'),
  labels: {
    singular: { en: 'Cards Grid', es: 'Cuadrícula de Tarjetas' },
    plural: { en: 'Cards Grids', es: 'Cuadrículas de Tarjetas' },
  },
  fields: [
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      label: { en: 'Columns', es: 'Columnas' },
    },
    {
      name: 'items',
      type: 'array',
      label: { en: 'Cards', es: 'Tarjetas' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Title', es: 'Título' },
        },
        {
          name: 'description',
          type: 'text',
          label: { en: 'Description', es: 'Descripción' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Image', es: 'Imagen' },
        },
        link(),
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
          name: 'rounded',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
            { label: { en: 'Large', es: 'Grande' }, value: 'large' },
          ],
          label: { en: 'Rounded', es: 'Bordes redondeados' },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
            { label: { en: 'Light', es: 'Claro' }, value: 'light' },
            { label: { en: 'Dark', es: 'Oscuro' }, value: 'dark' },
            { label: { en: 'Light Gray', es: 'Gris claro' }, value: 'light-gray' },
            { label: { en: 'Dark Gray', es: 'Gris oscuro' }, value: 'dark-gray' },
            { label: { en: 'Gradient 2', es: 'Gradiente 2' }, value: 'gradient-2' },
          ],
          label: { en: 'Background Color', es: 'Color de fondo' },
        },
      ],
    },
  ],
}
