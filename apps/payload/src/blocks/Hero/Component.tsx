import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { Hero } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { resolveLocale } from '@/core/lib/resolveLocale'

type Props = HeroBlock

export async function HeroBlockComponent({
  title,
  richText,
  actions,
  image,
  section,
  id,
}: Props) {
  const locale = await resolveLocale()

  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <Hero
        title={title ?? ''}
        text={prepareRichTextProps(richText)}
        image={prepareImageProps(image)}
        links={(actions ?? []).map((action) => prepareLinkProps(action, locale))}
      />
    </SectionContainer>
  )
}
