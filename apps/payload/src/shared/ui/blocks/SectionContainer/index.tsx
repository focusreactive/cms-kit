import { cn } from '@/shared/lib/utils'
import { Container, ContainerProps } from '../Container'

type Props = {
  children: React.ReactNode
  className?: string
  maxWidth?: ContainerProps['maxWidth']
}

export function SectionContainer({ children, className, maxWidth }: Props) {
  return (
    <section className={cn('py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24', className)}>
      <Container className="mx-auto" maxWidth={maxWidth}>
        {children}
      </Container>
    </section>
  )
}
