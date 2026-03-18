import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { generateRichText } from '@/core/lib/generateRichText'
import { sectionFields } from '@/fields/sectionFields'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  ...getBlockPreviewImage('Carousel'),
  labels: {
    singular: { en: 'Carousel', es: 'Carrusel' },
    plural: { en: 'Carousels', es: 'Carruseles' },
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: generateRichText(),
      label: { en: 'Intro Text', es: 'Texto introductorio' },
      localized: true,
    },
    {
      name: 'effect',
      type: 'select',
      defaultValue: 'slide',
      options: [
        { label: 'Slide', value: 'slide' },
        { label: 'Fade', value: 'fade' },
        { label: 'Cube', value: 'cube' },
        { label: 'Flip', value: 'flip' },
        { label: 'Coverflow', value: 'coverflow' },
        { label: 'Cards', value: 'cards' },
      ],
      label: { en: 'Effect', es: 'Efecto' },
    },
    {
      name: 'slides',
      type: 'array',
      label: { en: 'Slides', es: 'Diapositivas' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Image', es: 'Imagen' },
        },
        {
          name: 'text',
          type: 'richText',
          editor: generateRichText(),
          label: { en: 'Slide Text', es: 'Texto de la diapositiva' },
        },
      ],
    },
    sectionFields,
  ],
}
