import { cva } from 'class-variance-authority'
import { cn } from '@/core/lib/utils'
import { Media } from '../Media'
import type { Media as MediaType } from '@/payload-types'
import { Container } from '../Container'

export type SectionData = {
  id?: string | null
  theme?: 'light' | 'dark' | 'light-gray' | 'dark-gray' | null
  paddingY?: 'none' | 'base' | 'large' | null
  paddingX?: 'none' | 'base' | null
  maxWidth?: 'none' | 'base' | null
  background?: {
    media?: MediaType | number | null
    overlay?: 'black' | 'white' | null
    opacity?: number | null
  }
}

type Props = {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  sectionData: SectionData
}

const sectionVariants = cva('overflow-clip relative z-1', {
  variants: {
    paddingY: {
      none: 'py-0',
      base: 'py-sectionBase',
      large: 'py-sectionLarge',
    },
  },
  defaultVariants: {
    paddingY: 'base',
  },
})

export function SectionContainer({ children, className, containerClassName, sectionData }: Props) {
  const { id, theme, paddingY, background } = sectionData
  const overlayOpacity = background?.opacity != null ? background.opacity / 100 : undefined

  return (
    <section
      id={id ?? undefined}
      className={cn(
        sectionVariants({
          paddingY,
        }),
        className,
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Container containerData={sectionData} className={containerClassName}>
        {children}
      </Container>

      {background?.media && (
        <>
          <Media
            resource={background.media}
            className="absolute inset-0 size-full -z-2"
            videoClassName="size-full object-cover pointer-events-none"
            imgClassName="size-full object-cover pointer-events-none"
            fill
            aria-hidden
          />

          {background.overlay && (
            <div
              aria-hidden
              className="absolute inset-0 -z-1 pointer-events-none"
              style={{
                backgroundColor: `rgba(${background.overlay === 'black' ? '0,0,0' : '255,255,255'},${overlayOpacity})`,
              }}
            />
          )}
        </>
      )}
    </section>
  )
}
