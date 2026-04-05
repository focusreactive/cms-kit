import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { heroFields } from '@/fields/heroFields'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  ...getBlockPreviewImage('Hero'),
  labels: {
    singular: { en: 'Hero', es: 'Hero' },
    plural: { en: 'Heroes', es: 'Héroes' },
  },
  fields: embedSectionTab([...heroFields]),
}
