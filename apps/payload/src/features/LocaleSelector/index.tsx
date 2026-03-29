'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Button } from '@shared/ui'
import { Link as LocaleLink } from '@/i18n/navigation'
import { I18N_CONFIG } from '@/core/config/i18n'

type LocaleSelectorProps = {
  render: (locale: string) => React.ReactNode
}

export const LocaleSelector = ({ render }: LocaleSelectorProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const locale = useLocale()

  // useEffect must come before any conditional return (Rules of Hooks)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLocaleConfig = I18N_CONFIG.locales.find((l) => l.code === locale)
  const currentLocaleLabel = currentLocaleConfig?.label ?? locale

  // Don't render the selector when there is only one locale
  if (I18N_CONFIG.locales.length === 1) return null

  return (
    <div ref={ref} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
      >
        {render(currentLocaleLabel)}
      </div>
      {open && (
        <ul className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-md border border-primaryLightColor bg-bgColor py-1 shadow-lg">
          {I18N_CONFIG.locales.map((loc) => (
            <li className="px-1" key={loc.code}>
              <Button
                key={loc.code}
                clickDisabled={loc.code === locale}
                onClick={() => setOpen(false)}
              >
                <LocaleLink href={pathname} locale={loc.code}>
                  {loc.label}
                </LocaleLink>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
