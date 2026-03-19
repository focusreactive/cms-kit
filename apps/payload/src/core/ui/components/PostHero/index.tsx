
import React from 'react'

import type { Post } from '@/payload-types'
import { formatAuthors } from '@/core/lib/formatAuthors'
import { formatDateTime } from '@/core/lib/formatDateTime'
import { Media } from '@/core/ui'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, authors, publishedAt, title } = post

  const hasAuthors =
    authors && authors.length > 0 && formatAuthors(authors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end min-h-[80vh]">
      <div className="py-6 px-4 sm:py-6 sm:px-6 md:py-6 md:px-8 lg:py-6 w-full">
        <div className="mx-auto max-w-4xl z-10 relative">
          <div className="flex flex-col text-white max-w-4xl">
            <div className="space-y-8">
              <div className="flex gap-2 flex-wrap">
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category
                    const titleToUse = categoryTitle || 'Untitled category'

                    return (
                      <span
                        key={index}
                        className="uppercase text-xs font-semibold tracking-wider px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        {titleToUse}
                      </span>
                    )
                  }
                  return null
                })}
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  {title}
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-4 border-t border-white/20">
                {hasAuthors && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs uppercase tracking-wider text-white/60 font-medium">
                      Author
                    </p>
                    <p className="text-base font-medium">{formatAuthors(authors)}</p>
                  </div>
                )}
                {publishedAt && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs uppercase tracking-wider text-white/60 font-medium">
                      Published
                    </p>
                    <time dateTime={publishedAt} className="text-base font-medium">
                      {formatDateTime(publishedAt)}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {heroImage && typeof heroImage !== 'number' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
