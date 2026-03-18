import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/core/lib/utils'
import { ComponentProps } from 'react'

const variants = cva('mx-auto', {
  variants: {
    maxWidth: {
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    maxWidth: '7xl',
  },
})

export type ContainerProps = ComponentProps<'div'> & VariantProps<typeof variants>

export const Container: React.FC<ContainerProps> = ({
  className,
  maxWidth,
  children,
  ...props
}) => {
  return (
    <div className={cn(variants({ maxWidth }), className)} {...props}>
      {children}
    </div>
  )
}
