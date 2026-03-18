import { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { createLocalizedRichText } from '@/core/lib/createLocalizedDefault'
import { generateRichText } from '@/core/lib/generateRichText'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'

export const TextSectionBlock: Block = {
  slug: 'textSection',
  interfaceName: 'TextSectionBlock',
  ...getBlockPreviewImage('Text Section'),
  labels: {
    singular: {
      en: 'Text Section',
      es: 'Sección de Texto',
    },
    plural: {
      en: 'Text Sections',
      es: 'Secciones de Texto',
    },
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: generateRichText(),
      required: true,
      label: {
        en: 'Text',
        es: 'Texto',
      },
      localized: true,
      defaultValue: createLocalizedRichText(DEFAULT_VALUES.richText.text),
    },
  ],
}
