import React from 'react'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/core/lib/utils'
import { Link } from '@/core/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationProps {
  className?: string
  page: number
  totalPages: number
  basePath: string
}

const itemClass =
  'flex items-center justify-center h-9 min-w-[2.25rem] rounded-md px-2 text-sm font-medium text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors'

export const Pagination: React.FC<PaginationProps> = async ({ className, page, totalPages, basePath }) => {
  const t = await getTranslations('pagination')
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const getPagePath = (pageNumber: number) =>
    pageNumber === 1 ? basePath : `${basePath}?page=${pageNumber}`

  return (
    <nav
      className={cn('my-12 flex items-center justify-center gap-1', className)}
      aria-label="Pagination navigation"
    >
      {hasPrevPage ? (
        <Link href={getPagePath(page - 1)} className={itemClass} aria-label={t('goToPreviousPage')}>
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')} aria-disabled="true">
          <ChevronLeft className="size-4" />
        </span>
      )}

      {hasExtraPrevPages && (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')}>
          <span aria-hidden="true">…</span>
          <span className="sr-only">{t('morePages')}</span>
        </span>
      )}

      {hasPrevPage && (
        <Link href={getPagePath(page - 1)} className={itemClass}>{page - 1}</Link>
      )}

      <span className={cn(itemClass, 'bg-primaryColor text-bgColor pointer-events-none')} aria-current="page">
        {page}
      </span>

      {hasNextPage && (
        <Link href={getPagePath(page + 1)} className={itemClass}>{page + 1}</Link>
      )}

      {hasExtraNextPages && (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')}>
          <span aria-hidden="true">…</span>
          <span className="sr-only">{t('morePages')}</span>
        </span>
      )}

      {hasNextPage ? (
        <Link href={getPagePath(page + 1)} className={itemClass} aria-label={t('goToNextPage')}>
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')} aria-disabled="true">
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  )
}
