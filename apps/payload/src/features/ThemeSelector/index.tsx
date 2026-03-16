'use client'

import React, { useState } from 'react'

import { Button, ButtonVariant, ButtonSize } from '@/shared/ui'
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
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small} className="w-9 h-9 !p-0">
        <div className="size-5" />
      </Button>
    )
  }

  return (
    <>
      {value === 'dark' && (
        <Button className="transition-none w-9 h-9 !p-0" variant={ButtonVariant.Ghost} size={ButtonSize.Small} onClick={() => onThemeChange('light')}>
          <MoonIcon className="size-5" />
        </Button>
      )}
      {(value === 'light') && (
        <Button className="transition-none w-9 h-9 !p-0" variant={ButtonVariant.Ghost} size={ButtonSize.Small} onClick={() => onThemeChange('dark')}>
          <SunIcon className="size-5" />
        </Button>
      )}
    </>
  )
}
