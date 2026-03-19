import React from 'react'

import type { Header as HeaderType, Media } from '@/payload-types'
import { Header as SharedHeader } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/header/types'
import { SectionContainer } from '@/core/ui'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'

type Props = {
  data: HeaderType
}

export async function Header({ data }: Props) {
  if (!data) return null

  const links = (data.navItems ?? []).map((item) => prepareLinkProps(item.link))
  const image = prepareImageProps({ image: data.logo as Media })

  return (
    <SectionContainer
      sectionData={{
        paddingY: 'none',
        paddingX: 'none',
        marginTop: 'none',
        marginBottom: 'none',
        theme: undefined,
      }}
      className="sticky left-0 top-0 z-50 rounded-t-none overflow-x-visible!"
    >
      <SharedHeader links={links} image={image} alignVariant={AlignVariant.Right} />
    </SectionContainer>
  )
}
