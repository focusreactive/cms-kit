import type { Block } from 'payload'
import { cardsGridFields } from './fields'

export const CardsGridInlineBlock: Block = {
  slug: 'cardsGridInline',
  interfaceName: 'CardsGridInlineBlock',
  labels: {
    singular: { en: 'Cards Grid', es: 'Cuadrícula de Tarjetas' },
    plural: { en: 'Cards Grids', es: 'Cuadrículas de Tarjetas' },
  },
  fields: cardsGridFields,
}
