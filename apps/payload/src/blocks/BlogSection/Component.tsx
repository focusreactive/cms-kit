import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BlogSectionBlock } from '@/payload-types'
import type { Post, Media } from '@/payload-types'
import { BlogSection } from '@shared/ui'
import { SectionContainer } from '@/shared/ui'
import type { IBlogPostCardProps } from '@shared/ui/components/sections/blog/types'
import { BlogStyle } from '@shared/ui/components/sections/blog/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { BLOG_CONFIG } from '@/shared/config/blog'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async ({
  text,
  style,
  postsLimit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: postsLimit ?? 3,
    depth: 1,
    sort: '-createdAt',
    overrideAccess: true,
  })

  const blogStyle = (style as BlogStyle) ?? BlogStyle.ThreeColumn

  const formattedPosts: IBlogPostCardProps[] = posts.map((post: Post) => {
    const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
    const postUrl = `${BLOG_CONFIG.basePath}/${post.slug}`

    return {
      style: blogStyle,
      text: prepareRichTextProps(null),
      image: prepareImageProps(heroImage),
      link: { text: post.title, href: postUrl },
    }
  })

  return (
    <SectionContainer className="py-0 px-0">
      <BlogSection
        text={text ? prepareRichTextProps(text) : prepareRichTextProps(null)}
        posts={formattedPosts}
        style={blogStyle}
      />
    </SectionContainer>
  )
}
