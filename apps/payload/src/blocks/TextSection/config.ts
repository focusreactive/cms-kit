import { Block, Field } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { createLocalizedRichText } from '@/core/lib/createLocalizedDefault'
import { generateRichText } from '@/core/lib/generateRichText'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'

const fields: Field[] = [
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
]

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
  fields: embedSectionTab(fields),
}
