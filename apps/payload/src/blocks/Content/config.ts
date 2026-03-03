import { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { createLocalizedDefault, createLocalizedRichText } from '@/shared/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/shared/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/shared/constants/mediaDefaults'
import { generateRichText } from '@/shared/lib/generateRichText'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  ...getBlockPreviewImage('Content Section'),
  labels: {
    singular: {
      en: 'Content Section',
      es: 'Sección de Contenido',
    },
    plural: {
      en: 'Content Sections',
      es: 'Secciones de Contenido',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: {
        en: 'Heading',
        es: 'Encabezado',
      },
      localized: true,
      defaultValue: createLocalizedDefault(DEFAULT_VALUES.blocks.content.heading),
    },
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'image-text',
      options: [
        {
          label: {
            en: '50/50 Image + Text',
            es: '50/50 Imagen + Texto',
          },
          value: 'image-text',
        },
        {
          label: {
            en: '50/50 Text + Image',
            es: '50/50 Texto + Imagen',
          },
          value: 'text-image',
        },
      ],
      label: {
        en: 'Layout',
        es: 'Diseño',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Image',
        es: 'Imagen',
      },
      defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
    },
    {
      name: 'content',
      type: 'richText',
      editor: generateRichText(),
      required: true,
      label: {
        en: 'Content',
        es: 'Contenido',
      },
      localized: true,
      defaultValue: createLocalizedRichText(DEFAULT_VALUES.richText.content),
    },
  ],
}
