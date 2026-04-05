import React from 'react'

import type { Post } from '@/payload-types'

import { BlogPostsGrid } from '../BlogPostsGrid'
import { cn } from '@/core/lib/utils'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  relatedPostsLabel?: string | null
  readMoreLabel?: string | null
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, relatedPostsLabel, readMoreLabel } = props

  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full', className)}>
      {relatedPostsLabel && (
        <h2 className="text-2xl font-bold mb-6">{relatedPostsLabel}</h2>
      )}
      <BlogPostsGrid posts={docs} readMoreLabel={readMoreLabel} />
    </div>
  )
}
