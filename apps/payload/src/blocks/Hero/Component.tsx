import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { Hero } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { ImageAspectRatio } from '@shared/ui/components/ui/image/types'

type Props = HeroBlock

export const HeroBlockComponent: React.FC<Props> = ({
  title,
  richText,
  actions,
  media,
  section,
  id,
}) => {
  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <Hero
        title={title ?? ''}
        text={prepareRichTextProps(richText)}
        image={prepareImageProps(typeof media === 'object' ? media : null)}
        links={(actions ?? []).map((action) => prepareLinkProps(action))}
      />
    </SectionContainer>
  )
}
