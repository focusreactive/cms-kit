import React from 'react'
import type { TextSectionBlock as TextSectionBlockProps } from '@/payload-types'
import { Copy } from '@shared/ui'
import { SectionContainer } from '@/shared/ui'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

export const TextSectionBlockComponent: React.FC<TextSectionBlockProps> = ({ text }) => {
  return (
    <SectionContainer>
      <Copy
        columns={[prepareRichTextProps(text)]}
        isReversedOnMobile={false}
      />
    </SectionContainer>
  )
}
