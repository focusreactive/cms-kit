import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { HeaderClient } from './Component.client'
import { SectionContainer } from '@/core/ui'

type Props = {
  data: HeaderType
}

export async function Header({ data }: Props) {
  if (!data) return null

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
      <HeaderClient data={data} />
    </SectionContainer>
  )
}
