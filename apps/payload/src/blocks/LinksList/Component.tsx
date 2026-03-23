import React from 'react'
import type { LinksListBlock } from '@/payload-types'
import { LinksList } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { AlignVariant } from '@shared/ui/components/sections/linksList/types'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { resolveLocale } from '@/core/lib/resolveLocale'

export async function LinksListBlockComponent({ links, alignVariant, section, id }: LinksListBlock) {
  const locale = await resolveLocale()

  return (
    <SectionContainer sectionData={{ ...section, id }}>
      <LinksList
        links={(links ?? []).map((item) => prepareLinkProps(item.link, locale))}
        alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Left}
      />
    </SectionContainer>
  )
}
