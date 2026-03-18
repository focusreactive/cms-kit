'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { cn } from '@/core/lib/utils'
import { Link } from '@/core/ui'
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
            <li key={loc.code}>
              <Link
                href={pathname}
                locale={loc.code}
                className={cn(
                  'block px-4 py-2 text-sm text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors no-underline',
                  loc.code === locale && 'text-textSecondaryColor pointer-events-none cursor-default',
                )}
                onClick={() => setOpen(false)}
              >
                {loc.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
