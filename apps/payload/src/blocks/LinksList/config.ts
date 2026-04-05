import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { linksListFields } from './fields'

export const LinksListBlock: Block = {
  slug: 'linksList',
  interfaceName: 'LinksListBlock',
  ...getBlockPreviewImage('Links List'),
  labels: {
    singular: { en: 'Links List', es: 'Lista de enlaces' },
    plural: { en: 'Links Lists', es: 'Listas de enlaces' },
  },
  fields: embedSectionTab(linksListFields),
}
