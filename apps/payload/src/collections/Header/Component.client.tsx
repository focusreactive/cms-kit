'use client'

import React from 'react'
import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Container, Link, Logo, Section } from '@/shared/ui'
import { useTheme } from '@/shared/context'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { theme } = useTheme()

  return (
    <header
      className="z-20 sticky top-0 bg-background border-b"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Section as="div" block="header">
        <Container>
          <div className="flex justify-between">
            <Link href="/" aria-label="Go to homepage">
              <Logo resource={data.logo as Media} />
            </Link>
            <HeaderNav data={data} />
          </div>
        </Container>
      </Section>
    </header>
  )
}
