import React from 'react'

import type { Post } from '@/payload-types'
import { formatAuthors } from '@/core/lib/formatAuthors'
import { formatDateTime } from '@/core/lib/formatDateTime'
import { Image } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, authors, publishedAt, title, excerpt } = post

  const hasAuthors = authors && authors.length > 0 && formatAuthors(authors) !== ''

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {categories.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                return (
                  <span
                    key={index}
                    className="text-sm font-medium text-primary uppercase tracking-wide"
                  >
                    {category.title || 'Untitled category'}
                    {index < categories.length - 1 && (
                      <span className="text-muted-foreground ml-2 mr-1">&middot;</span>
                    )}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
          {title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {hasAuthors && (
            <span className="font-medium text-foreground">{formatAuthors(authors)}</span>
          )}
          {hasAuthors && publishedAt && <span>&middot;</span>}
          {publishedAt && (
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="mx-auto max-w-4xl mb-8">
        {heroImage && typeof heroImage !== 'number' && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              fill
              priority
              className="object-cover"
              {...prepareImageProps({ image: heroImage })}
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="mx-auto max-w-3xl">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      )}
    </div>
  )
}
