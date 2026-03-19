import { RichText, PostHero } from '@/core/ui'
import type { Post } from '@/payload-types'
import { RelatedPosts } from '@/entities'

type PostContentProps = {
  post: Post
}

export const PostContent: React.FC<PostContentProps> = ({
  post,
}) => {
  return (
    <article className="py-16">
      <PostHero post={post} />

      <div className="py-4 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 lg:py-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-4 pt-8">
            <RichText className="mx-auto" content={post.content} />
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <RelatedPosts
                className="mt-12 "
                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                relatedPostsIntro={post.relatedPostsIntro}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
