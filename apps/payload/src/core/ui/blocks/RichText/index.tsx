import { cn } from '@/core/lib/utils'
import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextReact,
} from '@payloadcms/richtext-lexical/react'
import { BLOG_CONFIG } from '@/core/config/blog'
import { Image } from '@shared/ui/components/ui/image'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import type { Media } from '@/payload-types'

type UploadNodeWithAspectRatio = DefaultNodeTypes & {
  type: 'upload'
  value?: unknown
  fields?: { aspectRatio?: string | null }
}

type NodeTypes = DefaultNodeTypes | UploadNodeWithAspectRatio

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `${BLOG_CONFIG.basePath}/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadNode = node as any
    const media = typeof uploadNode.value === 'object' ? (uploadNode.value as Media) : null
    const aspectRatio = uploadNode.fields?.aspectRatio ?? null
    const imageProps = prepareImageProps({ image: media, aspectRatio })
    
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...imageProps} />
  },
})

export const RichText = ({
  content,
  className,
}: {
  content: SerializedEditorState
  className?: string
}) => {
  if (!content) return null
  return (
    <RichTextReact
      className={cn('prose prose-sm sm:prose-base md:prose-lg max-w-full', className)}
      converters={jsxConverters}
      data={content}
    />
  )
}
