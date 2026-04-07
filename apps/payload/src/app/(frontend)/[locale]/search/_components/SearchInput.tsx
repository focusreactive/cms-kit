'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useDebounce } from '@uidotdev/usehooks'

const DEBOUNCE_MS = 500

interface SearchInputProps {
  defaultValue: string
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const t = useTranslations('search')
  const [value, setValue] = useState(defaultValue)
  const debouncedValue = useDebounce(value, DEBOUNCE_MS)
  const isFirstRender = useRef(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current

    if (input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const params = new URLSearchParams(searchParams)

    if (debouncedValue) {
      params.set('query', debouncedValue)
    } else {
      params.delete('query')
    }

    const query = params.toString()
    replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [debouncedValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('placeholder')}
        ref={inputRef}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-gray-500"
      />
    </div>
  )
}
