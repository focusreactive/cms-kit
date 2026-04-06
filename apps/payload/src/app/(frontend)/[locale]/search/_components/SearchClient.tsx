'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { PostCard } from './PostCard'
import { PageCard } from './PageCard'
import type { SearchResponse } from '@/search/types'

type Props = {
  locale: string
}

const MIN_LENGTH = 2
const DEBOUNCE_MS = 500

export function SearchClient({ locale }: Props) {
  const t = useTranslations('search')
  const [query, setQuery] = useState('')
  const [data, setData] = useState<SearchResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleChange = (value: string) => {
    setQuery(value)
    clearTimeout(timer.current)

    if (value.length < MIN_LENGTH) {
      setData(null)
      setStatus('idle')
      return
    }

    setStatus('loading')
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}&locale=${locale}`)
        if (!res.ok) throw new Error('error')
        const json: SearchResponse = await res.json()
        setData(json)
        setStatus('idle')
      } catch {
        setStatus('error')
        setData(null)
      }
    }, DEBOUNCE_MS)
  }

  const showPrompt = query.length < MIN_LENGTH
  const showNoResults = status === 'idle' && data !== null && data.groups.length === 0
  const showGroups = status === 'idle' && data !== null && data.groups.length > 0

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={t('placeholder')}
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-gray-500"
        />
        {status === 'loading' && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-5 w-5 animate-spin text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        )}
      </div>

      <div className="mt-6 space-y-2 text-sm text-gray-500">
        {status === 'error' && <p>{t('searchUnavailable')}</p>}
        {showNoResults && <p>{t('noResults')}</p>}
      </div>

      {showGroups && (
        <div className="mt-6 space-y-8">
          {data.groups.map((group) => (
            <section key={group.collection}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.collection === 'post' ? t('postsGroup') : t('pagesGroup')}
              </h2>
              <div className="space-y-2">
                {group.items.map((item) =>
                  group.collection === 'post' ? (
                    <PostCard key={item.documentId} item={item} />
                  ) : (
                    <PageCard key={item.documentId} item={item} />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
