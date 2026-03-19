import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { cardsGridFields } from './fields'

export const CardsGridBlock: Block = {
  slug: 'cardsGrid',
  interfaceName: 'CardsGridBlock',
  ...getBlockPreviewImage('Cards Grid'),
  labels: {
    singular: { en: 'Cards Grid', es: 'Cuadrícula de Tarjetas' },
    plural: { en: 'Cards Grids', es: 'Cuadrículas de Tarjetas' },
  },
  fields: embedSectionTab(cardsGridFields),
}
