import React from 'react'
import { Section, Container } from '@/shared/ui'
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
}) => {
  const testimonials = (testimonialItems ?? [])
    .map((item) => item.testimonial)
    .filter((t): t is Testimonial => typeof t !== 'number' && t !== null && t !== undefined)

  return (
    <Section className="px-0 sm:px-0 md:px-0">
      <Section as="div" className="py-0 sm:py-0 md:py-0 lg:py-0">
        <Container>
          <TestimonialsHeading heading={heading} subheading={subheading} />
        </Container>
      </Section>

      <AnimatedCarousel
        testimonials={testimonials}
        showRating={showRating ?? true}
        showAvatar={showAvatar ?? true}
        duration={duration ?? 60}
      />
    </Section>
  )
}
