import type { Block } from 'payload'
import { logosFields } from './fields'

export const LogosInlineBlock: Block = {
  slug: 'logosInline',
  interfaceName: 'LogosInlineBlock',
  labels: {
    singular: { en: 'Logos', es: 'Logos' },
    plural: { en: 'Logos', es: 'Logos' },
  },
  fields: logosFields,
}
