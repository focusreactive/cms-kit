import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { logosFields } from './fields'

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  ...getBlockPreviewImage('Logos'),
  labels: {
    singular: { en: 'Logos', es: 'Logos' },
    plural: { en: 'Logos', es: 'Logos' },
  },
  fields: embedSectionTab(logosFields),
}
