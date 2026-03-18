import React from 'react'
import Image from 'next/image'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { Media } from '@/core/ui'
import type { Media as MediaType } from '@/payload-types'

export default async function Icon() {
  const settings = await getSiteSettings({})

  const icon = settings?.adminIcon as MediaType | null

  if (icon) {
    return <Media resource={icon} imgClassName="object-contain" />
  }

  return <Image src="/favicon.svg" alt="Icon" width={32} height={32} />
}
