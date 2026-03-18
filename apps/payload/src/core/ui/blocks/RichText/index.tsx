import { cn } from '@/core/lib/utils'
import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextReact,
} from '@payloadcms/richtext-lexical/react'
import { BLOG_CONFIG } from '@/core/config/blog'

type NodeTypes = DefaultNodeTypes

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
      className={cn('prose prose-sm sm:prose-base md:prose-lg', className)}
      converters={jsxConverters}
      data={content}
    />
  )
}
