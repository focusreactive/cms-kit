import React from 'react'
import Image from 'next/image'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { Media } from '@/core/ui'
import type { Media as MediaType } from '@/payload-types'

export default async function Logo() {
  const settings = await getSiteSettings({})

  const logo = settings?.adminLogo as MediaType

  if (logo) {
    return (
      <div style={{ padding: '20px 0', maxWidth: '150px' }}>
        <Media resource={logo} imgClassName="object-contain w-full h-auto" />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <Image src="/logo.svg" alt="Logo" width={150} height={40} />
    </div>
  )
}
