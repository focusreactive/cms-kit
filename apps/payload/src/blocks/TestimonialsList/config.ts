import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { PRESET_TYPES_CONFIG } from '@/core/constants/presets'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { getBlockAdminComponents } from '@focus-reactive/payload-plugin-presets'

export const TestimonialsListBlock: Block = {
  slug: 'testimonialsList',
  interfaceName: 'TestimonialsListBlock',
  ...getBlockPreviewImage('Testimonials'),
  labels: {
    singular: { en: 'Testimonials', es: 'Testimonios' },
    plural: { en: 'Testimonials', es: 'Testimonios' },
  },
  admin: {
    components: getBlockAdminComponents(),
  },
  fields: embedSectionTab([...PRESET_TYPES_CONFIG.testimonialsList.fields]),
}
