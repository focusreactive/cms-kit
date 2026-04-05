'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Category } from './Category'
import { cn } from '@/core/lib/utils'

interface Category {
  title: string
  slug: string
}

type CategoryFiltersProps = {
  categories: Category[]
  activeCategories: string[]
  isPending: boolean
  startTransition: React.TransitionStartFunction
}

export function CategoryFilters({
  categories,
  activeCategories,
  isPending,
  startTransition,
}: CategoryFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('blog')

  const toggle = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const next = activeCategories.includes(slug)
      ? activeCategories.filter((s) => s !== slug)
      : [...activeCategories, slug]

    if (next.length > 0) {
      params.set('categories', next.join(','))
    } else {
      params.delete('categories')
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('categories')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const isAllActive = activeCategories.length === 0

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 mb-8 transition-opacity',
        isPending && 'opacity-50 pointer-events-none',
      )}
    >
      <Category isActive={isAllActive} title={t('all')} onClick={() => clearAll()} />

      {categories.map((category) => {
        const isActive = activeCategories.includes(category.slug)

        return (
          <Category
            key={category.slug}
            isActive={isActive}
            slug={category.slug}
            title={category.title}
            onClick={() => toggle(category.slug)}
          />
        )
      })}
    </div>
  )
}
