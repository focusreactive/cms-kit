import type { Testimonial, TestimonialsListBlock } from '@/payload-types'
import { joinText } from '@/core/utils/text'

export function extractTestimonialsText(block: TestimonialsListBlock): string {
  const testimonialText = (block.testimonialItems ?? []).flatMap((item) => {
    if (!item?.testimonial || typeof item.testimonial === 'number') return []
    const testimonial = item.testimonial as Testimonial
    return [testimonial.author, testimonial.company, testimonial.position, testimonial.content]
  })
  return joinText([block.heading, block.subheading, ...testimonialText])
}
