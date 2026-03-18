import React, { Fragment } from 'react'
import { Link, Media } from '@/core/ui'
import { cn } from '@/core/lib/utils'
import Image from 'next/image'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { CardPostData } from '@/core/types'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  basePath?: string
  showCategories?: boolean
  title?: string
}> = (props) => {
  const {
    className,
    doc,
    basePath = BLOG_CONFIG.basePath,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
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
              <Image
                src="/empty-placeholder.jpg"
                alt={`${titleToUse} - Placeholder image`}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          )}
          {heroImage && typeof heroImage !== 'number' && (
            <Media
              fill
              priority
              imgClassName="object-cover"
              resource={heroImage}
              className="w-full aspect-[4/3]"
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
            <div className="prose">
              <h3>{titleToUse}</h3>
            </div>
          )}
          {description && (
            <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
          )}
        </div>
      </article>
    </Link>
  )
}
