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
      className="z-20 sticky top-0 bg-bgColor border-b border-primaryLightColor"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-4 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 lg:py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between">
            <Link href="/" aria-label="Go to homepage">
              <Logo resource={data.logo as Media} />
            </Link>
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
