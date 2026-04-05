import { cva } from 'class-variance-authority'
import { SectionData } from '../SectionContainer'
import { cn } from '@/core/lib/utils'

const containerVariants = cva('mx-auto w-full', {
  variants: {
    paddingX: {
      none: 'px-0',
      base: 'px-containerBase',
    },

    maxWidth: {
      none: 'max-w-none',
      base: 'max-w-380',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    paddingX: 'base',
    maxWidth: 'base',
  },
})

type ContainerProps = {
  children: React.ReactNode
  containerData: Pick<SectionData, 'paddingX' | 'maxWidth'>
  className?: string
}

export function Container({ children, containerData, className }: ContainerProps) {
  const { paddingX, maxWidth } = containerData
  return (
    <div
      className={cn(
        containerVariants({
          paddingX,
          maxWidth,
        }),
        className,
      )}
    >
      {children}
    </div>
  )
}
