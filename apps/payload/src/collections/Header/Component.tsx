import React from 'react'

import type { Header as HeaderType, Media } from '@/payload-types'
import { Header as SharedHeader } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/header/types'
import { SectionContainer } from '@/core/ui'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { resolveLocale } from '@/core/lib/resolveLocale'
import { ImageAspectRatio } from '@shared/ui/components/ui/image/types'

type Props = {
  data: HeaderType
}

export async function Header({ data }: Props) {
  if (!data) return null

  const locale = await resolveLocale()
  const links = (data.navItems ?? []).map((item) => prepareLinkProps(item.link, locale))
  const image = prepareImageProps({
    image: data.logo as Media,
    aspectRatio: ImageAspectRatio['1/1'],
  })

  return (
    <SectionContainer
      sectionData={{
        paddingY: 'none',
        paddingX: 'none',
        theme: undefined,
      }}
      className="sticky left-0 top-0 z-50 rounded-t-none overflow-x-visible!"
    >
      <SharedHeader links={links} image={image} alignVariant={AlignVariant.Right} />
    </SectionContainer>
  )
}
