import type { Block } from 'payload'
import { linksListFields } from './fields'

export const LinksListInlineBlock: Block = {
  slug: 'linksListInline',
  interfaceName: 'LinksListInlineBlock',
  labels: {
    singular: { en: 'Links List', es: 'Lista de enlaces' },
    plural: { en: 'Links Lists', es: 'Listas de enlaces' },
  },
  fields: linksListFields,
}
