import React from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'
import { Footer as SharedFooter } from '@shared/ui'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { resolveLocale } from '@/core/lib/resolveLocale'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { SectionContainer } from '@/core/ui'
import { ImageAspectRatio } from '@shared/ui/components/ui/image/types'

type Props = {
  data: FooterType
}

export async function Footer({ data }: Props) {
  if (!data) return null

  const locale = await resolveLocale()
  const links = (data.links ?? []).map((item) => prepareLinkProps(item.link, locale))
  const image = prepareImageProps({
    image: data.logo as Media,
    aspectRatio: ImageAspectRatio['1/1'],
  })
  const text = prepareRichTextProps(data.text ?? null)

  return (
    <SectionContainer
      sectionData={{
        paddingY: 'base',
        paddingX: 'base',
        theme: undefined,
      }}
    >
      <SharedFooter
        links={links}
        image={image}
        text={text}
        copywriteText={data.copywriteText ?? undefined}
      />
    </SectionContainer>
  )
}
