import type { TextSectionBlock as TextSectionBlockProps } from '@/payload-types'
import { Section, Container, RichText } from '@/shared/ui'

export const TextSectionBlockComponent: React.FC<TextSectionBlockProps> = ({ text }) => {
  return (
    <Section>
      <Container maxWidth="4xl">
        <RichText content={text} />
      </Container>
    </Section>
  )
}
