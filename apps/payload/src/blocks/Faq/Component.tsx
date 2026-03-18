import { RichText, SectionContainer, SectionHeader } from '@/shared/ui'
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
    <SectionContainer>
      <FaqJsonLd faq={{ heading, items, ...rest } as FaqBlockProps} />
      <div className="mx-auto max-w-4xl">
        {heading && <SectionHeader heading={heading} />}
        <Accordion items={accordionItems} />
      </div>
    </SectionContainer>
  )
}
