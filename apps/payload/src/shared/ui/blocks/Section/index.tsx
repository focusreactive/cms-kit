import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const variants = cva('', {
  variants: {
    block: {
      section: 'py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24',
      header: 'py-4 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 lg:py-4',
    },
  },
  defaultVariants: {
    block: 'section',
  },
})

export type Props<T extends React.ElementType = 'section'> = {
  as?: T
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'> &
  VariantProps<typeof variants>

export function Section<T extends React.ElementType = 'section'>({
  as,
  className,
  children,
  block,
  ...props
}: Props<T>) {
  const Tag = as || 'section'

  return (
    <Tag className={cn(variants({ block }), className)} {...props}>
      {children}
    </Tag>
  )
}
