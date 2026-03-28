import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { PRESET_TYPES_CONFIG } from '@/core/constants/presets'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { getBlockAdminComponents } from '@focus-reactive/payload-plugin-presets'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  ...getBlockPreviewImage('Hero'),
  labels: {
    singular: { en: 'Hero', es: 'Hero' },
    plural: { en: 'Heroes', es: 'Héroes' },
  },
  admin: {
    components: getBlockAdminComponents(),
  },
  fields: embedSectionTab([...PRESET_TYPES_CONFIG.hero.fields]),
}
