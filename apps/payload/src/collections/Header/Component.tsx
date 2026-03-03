import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { HeaderClient } from './Component.client'

type Props = {
  data: HeaderType
}

export async function Header({ data }: Props) {
  if (!data) return null

  return <HeaderClient data={data} />
}
