'use client'

import { useTransition } from 'react'
import { PageRange, Pagination } from '@/core/ui'
import type { CardPostData } from '@/core/types'
import { BlogPostsGrid } from '@/entities'
import { BLOG_CONFIG } from '@/core/config/blog'
import { CategoryFilters } from '@/app/(frontend)/[locale]/blog/_components/CategoryFilters'
import { cn } from '@/core/lib/utils'

type BlogPageContentProps = {
  posts: CardPostData[]
  currentPage?: number
  totalPages?: number
  totalDocs?: number
  readMoreLabel?: string | null
  categories: { title: string; slug: string }[]
  activeCategories: string[]
}

export const BlogPageContent: React.FC<BlogPageContentProps> = ({
  posts,
  currentPage,
  totalPages,
  totalDocs,
  readMoreLabel,
  categories,
  activeCategories,
}) => {
  const [isPending, startTransition] = useTransition()

  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <CategoryFilters
          categories={categories}
          activeCategories={activeCategories}
          isPending={isPending}
          startTransition={startTransition}
        />

        <div className={cn('transition-opacity', isPending && 'opacity-50 pointer-events-none')}>
          {currentPage && totalDocs !== undefined && (
            <div className="mb-8">
              <PageRange
                collection="posts"
                currentPage={currentPage}
                limit={BLOG_CONFIG.postsPerPage}
                totalDocs={totalDocs}
              />
            </div>
          )}

          <BlogPostsGrid posts={posts} readMoreLabel={readMoreLabel} />

          {currentPage && totalPages && totalPages > 1 && (
            <Pagination
              basePath={BLOG_CONFIG.basePath}
              page={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </section>
  )
}
