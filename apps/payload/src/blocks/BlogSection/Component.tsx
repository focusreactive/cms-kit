import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BlogSectionBlock } from '@/payload-types'
import type { Post, Media } from '@/payload-types'
import { BlogSection } from '@shared/ui'
import type { IBlogPostCardProps } from '@shared/ui/components/sections/blog/types'
import { BlogStyle } from '@shared/ui/components/sections/blog/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import type { IRichTextProps } from '@shared/ui/components/ui/richText/types'
import { AlignVariant } from '@shared/ui/components/ui/richText/types'
import { BLOG_CONFIG } from '@/core/config/blog'
import { resolveLocale } from '@/core/lib/resolveLocale'
import { shouldIncludeLocalePrefix } from '@/core/lib/localePrefix'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async ({
  text,
  style,
  aspectRatio,
  postsLimit,
}) => {
  const payload = await getPayload({ config: configPromise })
  const locale = await resolveLocale()
  const _blogSettings = await getBlogPageSettings({ locale })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: postsLimit ?? 3,
    depth: 1,
    sort: '-createdAt',
    overrideAccess: true,
    locale,
  })

  const blogStyle = (style as BlogStyle) ?? BlogStyle.ThreeColumn

  const formattedPosts: IBlogPostCardProps[] = posts.map((post: Post) => {
    const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
    const postUrl = `${shouldIncludeLocalePrefix(locale) ? `/${locale}` : ''}${BLOG_CONFIG.basePath}/${post.slug}`

    const excerptRichText: IRichTextProps = {
      richText: post.excerpt ? <p>{post.excerpt}</p> : null,
      alignVariant: AlignVariant.Left,
      removeInnerMargins: false,
    }

    return {
      style: blogStyle,
      text: excerptRichText,
      image: prepareImageProps({ image: heroImage, aspectRatio: aspectRatio ?? null }),
      link: { text: post.title, href: postUrl },
    }
  })

  // TODO: pass _blogSettings.readMoreLabel to BlogSection once the shared UI component supports it
  return (
    <BlogSection
      text={text ? prepareRichTextProps(text) : prepareRichTextProps(null)}
      posts={formattedPosts}
      style={blogStyle}
    />
  )
}
