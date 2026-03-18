import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import { link } from './link'
import deepMerge from '@/core/lib/deepMerge'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  defaultValue?: ArrayField['defaultValue']
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, defaultValue, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    label: { en: 'Links', es: 'Enlaces' },
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '@/core/ui/components/RowLabel#RowLabel',
      },
    },
    ...(defaultValue !== undefined && { defaultValue }),
  }

  return deepMerge(generatedLinkGroup, overrides)
}
