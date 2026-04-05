import { RichText, PostHero } from '@/core/ui'
import type { Post } from '@/payload-types'
import { RelatedPosts } from '@/entities'
import { getRelatedPosts } from '@/core/lib/getRelatedPosts'
import type { Locale } from '@/core/types'

type PostContentProps = {
  post: Post
  locale: Locale
  relatedPostsLabel?: string | null
  readMoreLabel?: string | null
}

export const PostContent: React.FC<PostContentProps> = async ({
  post,
  locale,
  relatedPostsLabel,
  readMoreLabel,
}) => {
  const relatedPosts = await getRelatedPosts({ post, locale })

  return (
    <article>
      <PostHero post={post} />

      <div className="py-8 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <RichText className="mx-auto" content={post.content} />
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="border-t border-border py-12 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <RelatedPosts
              docs={relatedPosts}
              relatedPostsLabel={relatedPostsLabel}
              readMoreLabel={readMoreLabel}
            />
          </div>
        </div>
      )}
    </article>
  )
}
