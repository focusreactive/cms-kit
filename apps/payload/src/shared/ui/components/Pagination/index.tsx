import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Pagination as PaginationShadcn } from '@/shared/ui/shadcn'
import { Link } from '@/shared/ui'

export interface PaginationProps {
  className?: string
  page: number
  totalPages: number
  basePath: string
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { className, page, totalPages, basePath } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const getPagePath = (pageNumber: number): string => {
    if (pageNumber === 1) {
      return basePath
    }
    return `${basePath}?page=${pageNumber}`
  }

  return (
    <div className={cn('my-12', className)}>
      <PaginationShadcn.Root>
        <PaginationShadcn.Content>
          {hasPrevPage ? (
            <Link href={getPagePath(page - 1)}>
              <PaginationShadcn.Item>
                <PaginationShadcn.Previous />
              </PaginationShadcn.Item>
            </Link>
          ) : (
            <PaginationShadcn.Item>
              <PaginationShadcn.Previous disabled />
            </PaginationShadcn.Item>
          )}

          {hasExtraPrevPages && (
            <PaginationShadcn.Item>
              <PaginationShadcn.Ellipsis />
            </PaginationShadcn.Item>
          )}

          {hasPrevPage && (
            <Link href={getPagePath(page - 1)}>
              <PaginationShadcn.Item>
                <PaginationShadcn.Link>
                  {page - 1}
                </PaginationShadcn.Link>
              </PaginationShadcn.Item>
            </Link>
          )}

          <PaginationShadcn.Item>
            <PaginationShadcn.Link isActive>
              {page}
            </PaginationShadcn.Link>
          </PaginationShadcn.Item>

          {hasNextPage && (
            <Link href={getPagePath(page + 1)}>
              <PaginationShadcn.Item>
                <PaginationShadcn.Link>
                  {page + 1}
                </PaginationShadcn.Link>
              </PaginationShadcn.Item>
            </Link>
          )}

          {hasExtraNextPages && (
            <PaginationShadcn.Item>
              <PaginationShadcn.Ellipsis />
            </PaginationShadcn.Item>
          )}

          {hasNextPage ? (
            <Link href={getPagePath(page + 1)}>
              <PaginationShadcn.Item>
                <PaginationShadcn.Next />
              </PaginationShadcn.Item>
            </Link>
          ) : (
            <PaginationShadcn.Item>
              <PaginationShadcn.Next disabled />
            </PaginationShadcn.Item>
          )}
        </PaginationShadcn.Content>
      </PaginationShadcn.Root>
    </div>
  )
}
