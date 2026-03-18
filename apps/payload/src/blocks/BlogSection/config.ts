import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { generateRichText } from '@/core/lib/generateRichText'
import { sectionFields } from '@/fields/sectionFields'

export const BlogSectionBlock: Block = {
  slug: 'blogSection',
  interfaceName: 'BlogSectionBlock',
  ...getBlockPreviewImage('Blog Section'),
  labels: {
    singular: { en: 'Blog Section', es: 'Sección de Blog' },
    plural: { en: 'Blog Sections', es: 'Secciones de Blog' },
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
      name: 'style',
      type: 'select',
      defaultValue: 'three-column',
      options: [
        { label: { en: 'Three Column', es: 'Tres columnas' }, value: 'three-column' },
        {
          label: { en: 'Three Column with Images', es: 'Tres columnas con imágenes' },
          value: 'three-column-with-images',
        },
        {
          label: {
            en: 'Three Column with Background Images',
            es: 'Tres columnas con imágenes de fondo',
          },
          value: 'three-column-with-background-images',
        },
      ],
      label: { en: 'Style', es: 'Estilo' },
    },
    {
      name: 'postsLimit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      label: { en: 'Number of Posts', es: 'Número de publicaciones' },
    },
    sectionFields,
  ],
}
