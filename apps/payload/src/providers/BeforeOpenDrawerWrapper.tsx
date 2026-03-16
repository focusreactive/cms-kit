'use client'

import React from 'react'
import { BeforeOpenDrawerProvider } from '@focus-reactive/payload-plugin-presets/client'
export default function BeforeOpenDrawerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BeforeOpenDrawerProvider beforeOpenDrawer={async () => true}>
      {children}
    </BeforeOpenDrawerProvider>
  )
}
