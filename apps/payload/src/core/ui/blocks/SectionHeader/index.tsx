import { cn } from '@/core/lib/utils'
import { ComponentProps } from 'react'

type Props = ComponentProps<'h2'> & {
  heading: string
}

export const SectionHeader: React.FC<Props> = ({ className, heading, ...props }) => {
  return (
    <h2
      className={cn(
        'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center px-2 sm:px-0',
        className,
      )}
      {...props}
    >
      {heading}
    </h2>
  )
}
