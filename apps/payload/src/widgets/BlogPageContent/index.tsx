import { Container, Section, PageRange, Pagination } from '@/shared/ui'
import type { CardPostData } from '@/shared/types'
import { BlogPostsGrid } from '@/entities'
import { BLOG_CONFIG } from '@/shared/config/blog'

type BlogPageContentProps = {
  posts: CardPostData[]
  currentPage?: number
  totalPages?: number
  totalDocs?: number
  title?: string | null
}

export const BlogPageContent: React.FC<BlogPageContentProps> = ({
  posts,
  currentPage,
  totalPages,
  totalDocs,
  title,
}) => {
  return (
    <Section>
      <Container maxWidth="7xl">
        <div className="mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>{title}</h1>
          </div>
        </div>

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

        <BlogPostsGrid posts={posts} />

        {currentPage && totalPages && totalPages > 1 && (
          <Pagination basePath={BLOG_CONFIG.basePath} page={currentPage} totalPages={totalPages} />
        )}
      </Container>
    </Section>
  )
}
