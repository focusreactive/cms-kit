import { SectionHeader } from '@/shared/ui'

type Props = {
  heading?: string | null
  subheading?: string | null
}

export const TestimonialsHeading: React.FC<Props> = ({ heading, subheading }) => {
  if (!heading && !subheading) return null

  return (
    <div className="mb-8 text-center">
      {heading && <SectionHeader heading={heading} />}
      {subheading && (
        <p className="m-0 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subheading}
        </p>
      )}
    </div>
  )
}
