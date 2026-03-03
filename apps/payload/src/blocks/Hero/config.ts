import type { Block } from 'payload'
import { createPresetFields } from '@/fields/presetFields'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { PRESET_TYPES_CONFIG } from '@/shared/constants/presets'

const { presetFields } = createPresetFields()

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  ...getBlockPreviewImage('Hero'),
  labels: {
    singular: { en: 'Hero', es: 'Hero' },
    plural: { en: 'Heroes', es: 'Héroes' },
  },
  fields: [...PRESET_TYPES_CONFIG.hero.fields, presetFields],
}
