import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { Hero } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

type Props = HeroBlock

export const HeroBlockComponent: React.FC<Props> = ({ title, richText, actions, media }) => {
  return (
    <Hero
      title={title ?? ''}
      text={prepareRichTextProps(richText)}
      image={prepareImageProps(typeof media === 'object' ? media : null)}
      links={(actions ?? []).map((action) => prepareLinkProps(action))}
    />
  )
}
