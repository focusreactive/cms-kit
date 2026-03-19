import { cva } from 'class-variance-authority'
import { cn } from '@/core/lib/utils'

type SectionData = {
  id?: string | null
  theme?: 'light' | 'dark' | 'light-gray' | 'dark-gray' | null
  marginTop?: 'none' | 'base' | 'large' | null
  marginBottom?: 'none' | 'base' | 'large' | null
  paddingX?: 'none' | 'base' | 'large' | null
  paddingY?: 'none' | 'base' | 'large' | null
  maxWidth?: 'none' | 'base' | 'small' | null
  backgroundImage?: { url?: string | null } | number | null
}

type Props = {
  children: React.ReactNode
  className?: string
  sectionData: SectionData
}

const outerVariants = cva('', {
  variants: {
    marginTop: {
      none: 'mt-0',
      base: 'mt-sectionBase',
      large: 'mt-sectionLarge',
    },
    marginBottom: {
      none: 'mb-0',
      base: 'mb-sectionBase',
      large: 'mb-sectionLarge',
    },
  },
  defaultVariants: {
    marginTop: 'base',
    marginBottom: 'base',
  },
})

const innerVariants = cva('mx-auto', {
  variants: {
    paddingX: {
      none: 'px-0',
      base: 'px-sectionBase',
      large: 'px-sectionLarge',
    },
    paddingY: {
      none: 'py-0',
      base: 'py-sectionBase',
      large: 'py-sectionLarge',
    },
    maxWidth: {
      none: 'max-w-none',
      base: 'max-w-screen-xl',
      small: 'max-w-screen-sm',
    },
  },
  defaultVariants: {
    paddingX: 'base',
    paddingY: 'base',
    maxWidth: 'base',
  },
})

export function SectionContainer({ children, className, sectionData }: Props) {
  const { id, theme, marginTop, marginBottom, paddingX, paddingY, maxWidth, backgroundImage } =
    sectionData

  const bgUrl = backgroundImage && typeof backgroundImage !== 'number' ? backgroundImage.url : null

  return (
    <section
      id={id ?? undefined}
      className={cn(
        'mx-auto max-w-screen-xl overflow-x-hidden rounded-2xl',
        outerVariants({
          marginTop,
          marginBottom,
        }),
        theme,
        theme && 'bg-bgColor',
        className,
      )}
      style={bgUrl ? { background: `url(${bgUrl}) no-repeat center/cover` } : undefined}
    >
      <div
        className={innerVariants({
          paddingX,
          paddingY,
          maxWidth,
        })}
      >
        {children}
      </div>
    </section>
  )
}
