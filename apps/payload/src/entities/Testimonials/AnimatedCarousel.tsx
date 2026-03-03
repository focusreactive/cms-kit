import React from 'react'
import type { Testimonial } from '@/payload-types'
import { TestimonialCard } from './TestimonialCard'

interface AnimatedCarouselProps {
  testimonials: Testimonial[]
  showRating?: boolean
  showAvatar?: boolean
  duration?: number
}

export const AnimatedCarousel: React.FC<AnimatedCarouselProps> = ({
  testimonials,
  showRating = true,
  showAvatar = true,
  duration = 60,
}) => {
  const validTestimonials = testimonials.filter(
    (t): t is Testimonial => typeof t !== 'number' && t !== null && t !== undefined,
  )

  if (validTestimonials.length === 0) return null

  return (
    <>
      <div
        style={{ '--testimonials-carousel-duration': `${duration}s` } as React.CSSProperties}
        className="testimonials-carousel basic my-0 mx-auto py-5 max-w-screen overflow-hidden flex"
      >
        <div className="testimonials-carousel-group flex gap-4 pr-4 will-change-transform flex-auto">
          {validTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              showRating={showRating}
              showAvatar={showAvatar}
            />
          ))}
        </div>

        <div
          aria-hidden
          className="testimonials-carousel-group flex gap-4 pr-4 will-change-transform flex-auto"
        >
          {validTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              showRating={showRating}
              showAvatar={showAvatar}
            />
          ))}
        </div>
      </div>
    </>
  )
}
