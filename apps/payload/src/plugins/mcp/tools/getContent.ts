import type { PayloadRequest } from 'payload'
import { z } from 'zod'
import type { Page } from '@/payload-types'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { getServerSideURL } from '@/core/lib/getURL'

const VERBATIM_INSTRUCTION =
  'IMPORTANT: Transform the JSON above into a table for the user. Show ALL fields from the JSON in the table — do not omit any fields. Then show the follow-up text below the table.'

const SKIP_KEYS = new Set([
  'id',
  'blockType',
  'blockName',
  'url',
  'locale',
  'createdAt',
  'updatedAt',
])

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

function extractLexicalText(node: LexicalNode): string {
  if (node.text) return node.text
  if (!node.children) return ''

  return node.children.map(extractLexicalText).join('')
}

function findLexicalPreview(root: LexicalNode): string | null {
  const children = root.children ?? []

  for (const child of children) {
    if (child.type === 'heading') {
      const text = extractLexicalText(child).trim()

      if (text) return text.slice(0, 100)
    }
  }

  for (const child of children) {
    if (child.type === 'paragraph') {
      const text = extractLexicalText(child).trim()

      if (text) return text.slice(0, 100)
    }
  }

  return null
}

function isLexicalField(value: unknown): value is { root: LexicalNode } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as Record<string, unknown>).root === 'object'
  )
}

function derivePreview(block: Page['blocks'][0]): string {
  let topLevelArrayCount: number | null = null

  for (const [key, val] of Object.entries(block)) {
    if (SKIP_KEYS.has(key)) continue
    if (isLexicalField(val)) {
      const preview = findLexicalPreview(val.root)
      if (preview) return preview
    }
    if (Array.isArray(val) && topLevelArrayCount === null) {
      topLevelArrayCount = val.length
    }
  }

  const queue: unknown[] = [block]
  while (queue.length > 0) {
    const node = queue.shift()

    if (node === null || node === undefined) continue

    if (typeof node === 'string' && node.trim().length > 0) {
      return node.trim().slice(0, 100)
    }

    if (typeof node === 'object') {
      if (Array.isArray(node)) {
        queue.push(...node)
      } else {
        for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
          if (!SKIP_KEYS.has(k)) queue.push(v)
        }
      }
    }
  }

  return topLevelArrayCount !== null ? `${topLevelArrayCount} items` : ''
}

const parameters = {
  id: z.string().describe('Document ID'),
  locale: z
    .string()
    .optional()
    .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
}

export const getPageContent = {
  name: 'getPageContent',
  description:
    'Fetch a page outline by ID: metadata (title, slug, status, dates, URLs) and a layout block index with type and preview text for each block. Use getPageBlock to retrieve the full content of a specific block.',
  parameters,
  handler: async (args: Record<string, unknown>, req: PayloadRequest) => {
    const { id, locale } = args as { id: string; locale?: string }
    const doc = await req.payload.findByID({
      collection: 'page',
      id,
      overrideAccess: false,
      req,
      depth: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(locale ? { locale: locale as any } : {}),
    })

    const serverURL = getServerSideURL()
    const resolvedLocale = locale ?? (req.locale as string) ?? 'en'
    const adminUrl = `${serverURL}/admin/collections/page/${doc.id}`
    const url = buildUrl({
      collection: 'page',
      breadcrumbs: doc.breadcrumbs as Page['breadcrumbs'],
      locale: resolvedLocale,
    })

    const docRecord = doc as unknown as Record<string, unknown>
    const { id: docId, title, slug, _status } = docRecord
    const metadata = {
      id: docId,
      title,
      slug,
      _status,
      adminUrl,
      ...(url ? { url } : {}),
    }

    const blocks = doc.blocks ?? []
    const outline = blocks.map((block, index) => ({
      index,
      type: block.blockType as string,
      preview: derivePreview(block),
    }))

    return {
      content: [
        { type: 'text' as const, text: JSON.stringify(metadata) },
        { type: 'text' as const, text: VERBATIM_INSTRUCTION },
        { type: 'text' as const, text: JSON.stringify(outline) },
        { type: 'text' as const, text: VERBATIM_INSTRUCTION },
        {
          type: 'text' as const,
          text: 'To view a block in full, call getPageBlock with the page id and the block index.',
        },
      ],
    }
  },
}

export const getPostContent = {
  name: 'getPostContent',
  description:
    'Fetch a complete post document by ID, including all layout blocks, rich text, and SEO fields.',
  parameters,
  handler: async (args: Record<string, unknown>, req: PayloadRequest) => {
    const { id, locale } = args as { id: string; locale?: string }
    const doc = await req.payload.findByID({
      collection: 'posts',
      id,
      overrideAccess: false,
      req,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(locale ? { locale: locale as any } : {}),
    })

    return { content: [{ type: 'text' as const, text: JSON.stringify(doc) }] }
  },
}
