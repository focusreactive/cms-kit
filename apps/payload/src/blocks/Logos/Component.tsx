import React from 'react'
import type { LogosBlock } from '@/payload-types'
import { Logos } from '@shared/ui'
import { SectionContainer } from '@/core/ui'
import { AlignVariant } from '@shared/ui/components/sections/logos/types'
import type { ILogoItem } from '@shared/ui/components/sections/logos/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { resolveLocale } from '@/core/lib/resolveLocale'

export const LogosBlockComponent: React.FC<LogosBlock> = async ({
  items,
  alignVariant,
  section,
  id,
}) => {
  const locale = await resolveLocale()

  const logoItems: ILogoItem[] = (items ?? []).map((item) => ({
    image: prepareImageProps(item.image),
    link: item.link ? prepareLinkProps(item.link, locale) : undefined,
  }))

  return (
    <SectionContainer sectionData={{ ...section, id }} className="overflow-x-visible!">
      <Logos
        items={logoItems}
        alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Center}
      />
    </SectionContainer>
  )
}
