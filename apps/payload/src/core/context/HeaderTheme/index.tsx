'use client'

import type { Theme } from '@/core/context/Theme/types'
import canUseDOM from '@/core/lib/canUseDOM'

import React, { createContext, use, useState } from 'react'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setHeaderTheme = (themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
