import { RichText, Section, SectionHeader, Container } from '@/shared/ui'
import { Accordion, AccordionItemData } from '@/shared/ui/components/Accordion'
import { FaqJsonLd } from '@/shared/seo/components'
import type { FaqBlock as FaqBlockProps } from '@/payload-types'

export const FaqBlockComponent: React.FC<FaqBlockProps> = ({ heading, items, ...rest }) => {
  const accordionItems: AccordionItemData[] = (items ?? []).map((item, index) => ({
    id: String(index),
    trigger: item.question,
    content: <RichText content={item.answer} />,
  }))

  return (
    <Section>
      <FaqJsonLd faq={{ heading, items, ...rest } as FaqBlockProps} />
      <Container maxWidth="4xl">
        {heading && <SectionHeader heading={heading} />}

        <div className="space-y-4">
          <Accordion items={accordionItems} />
        </div>
      </Container>
    </Section>
  )
}
