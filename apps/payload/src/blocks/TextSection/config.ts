import { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { createLocalizedRichText } from '@/shared/lib/createLocalizedDefault'
import { generateRichText } from '@/shared/lib/generateRichText'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'

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
