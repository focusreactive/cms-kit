import React from 'react'
import type { LinksListBlock } from '@/payload-types'
import { LinksList } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { AlignVariant } from '@shared/ui/components/sections/linksList/types'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LinksListBlockComponent: React.FC<LinksListBlock> = ({ links, alignVariant }) => {
  return (
    <SectionContainer>
      <LinksList
        links={(links ?? []).map((item) => prepareLinkProps(item.link))}
        alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Left}
      />
    </SectionContainer>
  )
}
