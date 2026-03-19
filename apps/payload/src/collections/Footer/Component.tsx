import React from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'
import { Footer as SharedFooter } from '@shared/ui'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { SectionContainer } from '@/core/ui'

type Props = {
  data: FooterType
}

export async function Footer({ data }: Props) {
  if (!data) return null

  const links = (data.links ?? []).map((item) => prepareLinkProps(item.link))
  const image = prepareImageProps({ image: data.logo as Media })
  const text = prepareRichTextProps(data.text ?? null)

  return (
    <SectionContainer
      sectionData={{
        paddingY: 'base',
        paddingX: 'base',
        marginTop: 'base',
        marginBottom: 'none',
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
