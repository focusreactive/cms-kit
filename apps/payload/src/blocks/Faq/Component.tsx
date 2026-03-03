import { RichText, Accordion, Section, SectionHeader, Container } from '@/shared/ui'
import { FaqJsonLd } from '@/shared/seo/components'
import type { FaqBlock as FaqBlockProps } from '@/payload-types'

export const FaqBlockComponent: React.FC<FaqBlockProps> = ({ heading, items, ...rest }) => {
  return (
    <Section>
      <FaqJsonLd faq={{ heading, items, ...rest } as FaqBlockProps} />
      <Container maxWidth="4xl">
        {heading && <SectionHeader heading={heading} />}

        <div className="space-y-4">
          <Accordion.Root type="single" collapsible>
            {items?.map((item, index) => (
              <Accordion.Item key={index} value={`item-${index}`}>
                <Accordion.Trigger>{item.question}</Accordion.Trigger>
                <Accordion.Content>
                  <RichText content={item.answer} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </Section>
  )
}
