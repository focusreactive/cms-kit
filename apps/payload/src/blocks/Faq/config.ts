import { Block, Field } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import {
  createLocalizedDefault,
  createLocalizedRichText,
  createRichTextState,
} from '@/core/lib/createLocalizedDefault'
import { generateRichText } from '@/core/lib/generateRichText'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'
import type { Locale } from '@/core/types'

function buildFaqItems(locale: Locale) {
  const { question, answer } = DEFAULT_VALUES.blocks.faq
  return Array.from({ length: 3 }, () => ({
    question: question[locale],
    answer: createRichTextState(answer[locale].heading, answer[locale].paragraph),
  }))
}

const fields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
    label: { en: 'Heading', es: 'Encabezado' },
    localized: true,
    defaultValue: createLocalizedDefault(DEFAULT_VALUES.blocks.faq.heading),
  },
  {
    name: 'items',
    type: 'array',
    minRows: 1,
    required: true,
    localized: true,
    defaultValue: createLocalizedDefault({ en: buildFaqItems('en'), es: buildFaqItems('es') }),
    fields: [
      {
        name: 'question',
        type: 'text',
        required: true,
        label: { en: 'Question', es: 'Pregunta' },
        localized: true,
      },
      {
        name: 'answer',
        type: 'richText',
        editor: generateRichText(),
        required: true,
        label: { en: 'Answer', es: 'Respuesta' },
        localized: true,
        defaultValue: createLocalizedRichText(DEFAULT_VALUES.blocks.faq.answer),
      },
    ],
  },
]

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  ...getBlockPreviewImage('FAQ Section'),
  labels: {
    singular: { en: 'FAQ Section', es: 'Sección de FAQ' },
    plural: { en: 'FAQ Sections', es: 'Secciones de FAQ' },
  },
  fields: embedSectionTab(fields),
}
