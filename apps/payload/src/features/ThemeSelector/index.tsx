'use client'

import React, { useState } from 'react'

import { Button } from '@/shared/ui'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Theme } from '@/shared/context'
import { themeLocalStorageKey, useTheme } from '@/shared/context'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<Theme | null>(null)

  const onThemeChange = (themeToSet: Theme) => {
    setTheme(themeToSet)
    setValue(themeToSet)
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue((preference ?? "light") as Theme)
  }, [])

  if (!value) {
    return (
      <Button variant="ghost" size="icon">
        <div className="size-5" />
      </Button>
    )
  }

  return (
    <>
      {value === 'dark' && (
        <Button className="transition-none" variant="ghost" size="icon" onClick={() => onThemeChange('light')}>
          <MoonIcon className="size-5" />
        </Button>
      )}
      {(value === 'light') && (
        <Button className="transition-none" variant="ghost" size="icon" onClick={() => onThemeChange('dark')}>
          <SunIcon className="size-5" />
        </Button>
      )}
    </>
  )
}
