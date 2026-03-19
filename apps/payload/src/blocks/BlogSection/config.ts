import type { Block, Field } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { generateRichText } from '@/core/lib/generateRichText'

const fields: Field[] = [
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
    name: 'aspectRatio',
    type: 'select',
    defaultValue: '1/1',
    label: { en: 'Aspect Ratio', es: 'Relación de aspecto' },
    admin: {
      condition: (data) => data?.style !== 'three-column',
      description: {
        en: 'Aspect ratio applied to all post images in this section',
        es: 'Relación de aspecto aplicada a todas las imágenes de publicaciones en esta sección',
      },
    },
    options: [
      { label: { en: '16/9', es: '16/9' }, value: '16/9' },
      { label: { en: '3/2', es: '3/2' }, value: '3/2' },
      { label: { en: '4/3', es: '4/3' }, value: '4/3' },
      { label: { en: '1/1', es: '1/1' }, value: '1/1' },
      { label: { en: '9/16', es: '9/16' }, value: '9/16' },
      { label: { en: '1/2', es: '1/2' }, value: '1/2' },
      { label: { en: '4/1', es: '4/1' }, value: '4/1' },
      { label: { en: '3/1', es: '3/1' }, value: '3/1' },
      { label: { en: 'Auto', es: 'Auto' }, value: 'auto' },
    ],
  },
  {
    name: 'postsLimit',
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 12,
    label: { en: 'Number of Posts', es: 'Número de publicaciones' },
  },
]

export const BlogSectionBlock: Block = {
  slug: 'blogSection',
  interfaceName: 'BlogSectionBlock',
  ...getBlockPreviewImage('Blog Section'),
  labels: {
    singular: { en: 'Blog Section', es: 'Sección de Blog' },
    plural: { en: 'Blog Sections', es: 'Secciones de Blog' },
  },
  fields,
}
