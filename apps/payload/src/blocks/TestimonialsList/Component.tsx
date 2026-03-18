import React from 'react'
import { SectionContainer } from '@/core/ui'
import { AnimatedCarousel, TestimonialsHeading } from '@/entities'
import type { Testimonial, TestimonialsListBlock } from '@/payload-types'

type Props = TestimonialsListBlock

export const TestimonialsListBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  testimonialItems,
  showRating = true,
  showAvatar = true,
  duration = 60,
  section,
  id,
}) => {
  const testimonials = (testimonialItems ?? [])
    .map((item) => item.testimonial)
    .filter((t): t is Testimonial => typeof t !== 'number' && t !== null && t !== undefined)

  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <TestimonialsHeading heading={heading} subheading={subheading} />
      <AnimatedCarousel
        testimonials={testimonials}
        showRating={showRating ?? true}
        showAvatar={showAvatar ?? true}
        duration={duration ?? 60}
      />
    </SectionContainer>
  )
}
