import React from 'react'

import type { Post } from '@/payload-types'

import { BlogPostsGrid } from '../BlogPostsGrid'
import { cn } from '@/shared/lib/utils'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  relatedPostsIntro?: string
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, relatedPostsIntro } = props

  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full', className)}>
      <h2 className="text-2xl font-bold mb-6">
        {relatedPostsIntro}
      </h2>

      <BlogPostsGrid posts={docs} />
    </div>
  )
}
