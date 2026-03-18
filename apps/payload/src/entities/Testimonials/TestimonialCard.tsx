import { Media } from '@/core/ui'
import type { Testimonial } from '@/payload-types'
import { StarIcon } from 'lucide-react'

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  const numRating = typeof rating === 'number' ? rating : Number(rating) || 0

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          size={18}
          className={`transition-all duration-200 ${
            star <= numRating
              ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
              : 'text-textSecondaryColor'
          }`}
        />
      ))}
    </div>
  )
}

export const TestimonialCard: React.FC<{
  testimonial: Testimonial
  showRating?: boolean
  showAvatar?: boolean
}> = ({ testimonial, showRating = true, showAvatar = true }) => {
  if (typeof testimonial === 'number' || typeof testimonial === 'string' || !testimonial)
    return null

  return (
    <div
      className="
      testimonials-card
      w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[450px] h-full
      flex flex-col border border-border rounded-2xl overflow-hidden bg-bgColor p-8 shadow-sm hover:shadow-md
      transition-all duration-300 hover:-translate-y-1
    "
    >
      {testimonial.content && (
        <p className="text-textColor mb-6 flex-1 text-lg leading-relaxed italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      )}

      <div className="w-full mt-auto pt-5 border-t border-textSecondaryColor">
        <div className="flex items-center gap-4">
          {showAvatar && testimonial.avatar && typeof testimonial.avatar !== 'number' && (
            <div className="shrink-0">
              <Media
                resource={testimonial.avatar}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-textSecondaryColor"
                imgClassName="rounded-full object-cover h-full w-full"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-textColor truncate text-base">
              {testimonial.author}
            </p>
            {(testimonial.position || testimonial.company) && (
              <p className="text-sm text-textSecondaryColor truncate mt-1">
                {[testimonial.position, testimonial.company].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>
        {showRating && testimonial.rating && (
          <div className="mt-4">
            <Rating rating={testimonial.rating} />
          </div>
        )}
      </div>
    </div>
  )
}
