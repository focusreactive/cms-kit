import type { Block } from 'payload'
import { createPresetFields } from '@/fields/presetFields'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { PRESET_TYPES_CONFIG } from '@/core/constants/presets'
import { sectionFields } from '@/fields/sectionFields'

const { presetFields } = createPresetFields()

export const TestimonialsListBlock: Block = {
  slug: 'testimonialsList',
  interfaceName: 'TestimonialsListBlock',
  ...getBlockPreviewImage('Testimonials'),
  labels: {
    singular: { en: 'Testimonials', es: 'Testimonios' },
    plural: { en: 'Testimonials', es: 'Testimonios' },
  },
  fields: [...PRESET_TYPES_CONFIG.testimonialsList.fields, presetFields, sectionFields],
}
