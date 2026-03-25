import React, { Fragment } from 'react'
import { Link } from '@/core/ui'
import { cn } from '@/core/lib/utils'
import NextImage from 'next/image'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { CardPostData } from '@/core/types'
import { Image } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { ImageAspectRatio } from '@shared/ui/components/ui/image/types'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  basePath?: string
  showCategories?: boolean
  title?: string
  readMoreLabel?: string
}> = (props) => {
  const {
    className,
    doc,
    basePath = BLOG_CONFIG.basePath,
    showCategories,
    title: titleFromProps,
    readMoreLabel,
  } = props

  const { slug, categories, excerpt, title, heroImage } = doc || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `${basePath}/${slug}`

  return (
    <Link className="not-prose" href={href}>
      <article
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
          className,
        )}
      >
        <div className="relative w-full">
          {!heroImage && (
            <div className="relative w-full aspect-[4/3]">
              <NextImage
                src="/empty-placeholder.jpg"
                alt={`${titleToUse} - Placeholder image`}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          )}
          {heroImage && typeof heroImage !== 'number' && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              fill
              priority
              className="object-cover"
              {...prepareImageProps({ image: heroImage, aspectRatio: ImageAspectRatio['4/3'] })}
            />
          )}
        </div>
        <div className="p-4">
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}
          {titleToUse && (
            <h3 className="font-bold text-lg">{titleToUse}</h3>
          )}
          {excerpt && (
            <div className="mt-2"><p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p></div>
          )}
          {readMoreLabel && (
            <div className="mt-4">
              <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                {readMoreLabel}
                <span aria-hidden="true">&rsaquo;</span>
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
