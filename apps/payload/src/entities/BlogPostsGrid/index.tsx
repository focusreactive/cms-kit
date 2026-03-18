import React from 'react'
import { Card, EmptyState } from '@/core/ui'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { CardPostData } from '@/core/types'

export type Props = {
  posts: CardPostData[]
}

export const BlogPostsGrid: React.FC<Props> = (props) => {
  const { posts } = props

  if (!posts || posts.length === 0) {
    return <EmptyState title="No posts" description="" />
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
      {posts.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div className="col-span-4" key={index}>
              <Card
                className="h-full"
                doc={result}
                basePath={BLOG_CONFIG.basePath}
                showCategories
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
