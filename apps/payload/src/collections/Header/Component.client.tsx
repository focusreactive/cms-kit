'use client'

import React from 'react'
import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Link, Logo } from '@/core/ui'
import { useTheme } from '@/core/context'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { theme } = useTheme()

  return (
    <header
      className="flex justify-between gap-10 bg-white/30 p-3 backdrop-blur-md"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Link href="/" aria-label="Go to homepage">
        <Logo resource={data.logo as Media} />
      </Link>
      <HeaderNav data={data} />
    </header>
  )
}
