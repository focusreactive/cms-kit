import React from 'react'
import type { LogosBlock } from '@/payload-types'
import { Logos } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { AlignVariant } from '@shared/ui/components/sections/logos/types'
import type { ILogoItem } from '@shared/ui/components/sections/logos/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LogosBlockComponent: React.FC<LogosBlock> = ({ items, alignVariant }) => {
  const logoItems: ILogoItem[] = (items ?? []).map((item) => ({
    image: prepareImageProps(typeof item.image === 'object' ? item.image : null),
    link: item.link ? prepareLinkProps(item.link) : undefined,
  }))

  return (
    <SectionContainer>
      <Logos
        items={logoItems}
        alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Center}
      />
    </SectionContainer>
  )
}
