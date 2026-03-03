import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { ThemeSelector } from '@/features/ThemeSelector'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  return (
    <div className="flex gap-4 items-center">
      <DesktopNav data={data} />

      <ThemeSelector />

      <MobileNav data={data} />
    </div>
  )
}
