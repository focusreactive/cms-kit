import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/core/lib/blockPreviewImage'
import { embedSectionTab } from '@/fields/section/embedSectionTab'
import { testimonialsListFields } from '@/fields/testimonialsListFields'

export const TestimonialsListBlock: Block = {
  slug: 'testimonialsList',
  interfaceName: 'TestimonialsListBlock',
  ...getBlockPreviewImage('Testimonials'),
  labels: {
    singular: { en: 'Testimonials', es: 'Testimonios' },
    plural: { en: 'Testimonials', es: 'Testimonios' },
  },
  fields: embedSectionTab([...testimonialsListFields]),
}
