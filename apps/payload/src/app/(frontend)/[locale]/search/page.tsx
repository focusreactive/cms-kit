import type { Metadata } from 'next'
import type { Footer as FooterType, Header as HeaderType } from '@/payload-types'
import type { Locale } from '@/core/types'

import { getTranslations } from 'next-intl/server'
import { search } from '@/search/search'
import { getSiteSettings } from '@/core/lib/getSiteSettings'

import { Suspense } from 'react'
import { Footer, Header } from '@/widgets'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './SearchInput'

type Args = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ query?: string }>
}

export default async function SearchPage({ params, searchParams }: Args) {
  const [{ locale }, { query: rawQuery }] = await Promise.all([params, searchParams])
  const query = rawQuery && decodeURIComponent(rawQuery)
  const siteSettings = await getSiteSettings({ locale })

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <SearchInput defaultValue={query ?? ''} />

          <Suspense fallback={null}>
            <SearchResults query={query} locale={locale} />
          </Suspense>
        </div>
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'search' })

  return {
    title: t('pageTitle'),
  }
}

// SearchResults

const PLACEHOLDER = '/empty-placeholder.jpg'

interface SearchResultsProps {
  query?: string
  locale: string
}

async function SearchResults({ query, locale }: SearchResultsProps) {
  if (!query) return null

  const t = await getTranslations('search')
  const result = await search({ query, locale })

  if (!result.success) {
    return (
      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <p>{t('searchUnavailable')}</p>
      </div>
    )
  }

  if (!result.data.length) {
    return (
      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <p>{t('noResults')}</p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-8">
      {result.data.map((group) => (
        <section key={group.collection}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {group.collection === 'post' ? t('postsGroup') : t('pagesGroup')}
          </h2>

          <div className="space-y-2">
            {group.items.map((item) => (
              <Link
                key={item.documentId}
                href={item.url}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={item.imageUrl ?? PLACEHOLDER}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
