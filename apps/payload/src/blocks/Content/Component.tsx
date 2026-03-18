import { cva } from 'class-variance-authority'
import { RichText, SectionContainer, Media, SectionHeader } from '@/shared/ui'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

const variants = cva('flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center', {
  variants: {
    layout: {
      'image-text': '',
      'text-image': 'lg:flex-row-reverse flex-col-reverse',
    },
  },
  defaultVariants: {
    layout: 'image-text',
  },
})

export const ContentBlockComponent: React.FC<ContentBlockProps> = ({
  heading,
  layout,
  content,
  image,
}) => {
  return (
    <SectionContainer>
      {heading && <SectionHeader heading={heading} />}

      <div className={variants({ layout })}>
        <Media
          resource={image}
          fill
          className="relative mb-6 sm:mb-8 lg:mb-0 w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg shadow-lg overflow-hidden"
          imgClassName="object-cover"
        />
        {content && (
          <div className="w-full lg:w-1/2 max-w-none">
            <RichText content={content} />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
