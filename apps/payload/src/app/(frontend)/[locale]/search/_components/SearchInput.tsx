'use client'

import { useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const DEBOUNCE_MS = 500

interface SearchInputProps {
  defaultValue: string
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const t = useTranslations('search')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleChange = (value: string) => {
    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set('query', value)
      } else {
        params.delete('query')
      }

      const query = params.toString()
      replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    }, DEBOUNCE_MS)
  }

  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t('placeholder')}
        autoFocus
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-gray-500"
      />
    </div>
  )
}
