import { PageRange, Pagination } from '@/core/ui'
import type { CardPostData } from '@/core/types'
import { BlogPostsGrid } from '@/entities'
import { BLOG_CONFIG } from '@/core/config/blog'

type BlogPageContentProps = {
  posts: CardPostData[]
  currentPage?: number
  totalPages?: number
  totalDocs?: number
  readMoreLabel?: string | null
}

export const BlogPageContent: React.FC<BlogPageContentProps> = ({
  posts,
  currentPage,
  totalPages,
  totalDocs,
  readMoreLabel,
}) => {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
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
          <Pagination basePath={BLOG_CONFIG.basePath} page={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  )
}
