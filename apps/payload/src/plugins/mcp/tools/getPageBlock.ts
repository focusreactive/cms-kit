import type { PayloadRequest } from 'payload'
import { z } from 'zod'

const VERBATIM_INSTRUCTION =
  'IMPORTANT: Transform the JSON above into a table for the user. Show ALL fields from the JSON in the table — do not omit any fields. Then show the follow-up text below the table.'

function isLexical(val: unknown): val is { root: { children: unknown[] } } {
  return (
    typeof val === 'object' &&
    val !== null &&
    'root' in val &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (val as any).root === 'object' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.isArray((val as any).root?.children)
  )
}

function lexicalToMarkdown(node: Record<string, unknown>): string {
  const type = node.type as string | undefined
  const children = (node.children as Record<string, unknown>[] | undefined) ?? []
  const childText = () => children.map(lexicalToMarkdown).join('')

  switch (type) {
    case 'root':
      return childText()
    case 'paragraph':
      return childText() + '\n\n'
    case 'heading': {
      const tag = (node.tag as string) ?? 'h1'
      const level = parseInt(tag.replace('h', ''), 10) || 1
      return '#'.repeat(level) + ' ' + childText() + '\n\n'
    }
    case 'text': {
      let t = (node.text as string) ?? ''
      const fmt = (node.format as number) ?? 0
      if (fmt & 1) t = `**${t}**` // bold
      if (fmt & 2) t = `_${t}_` // italic
      if (fmt & 16) t = `\`${t}\`` // code
      return t
    }
    case 'link': {
      const url = (node.url as string) ?? '#'
      return `[${childText()}](${url})`
    }
    case 'list': {
      const ordered = (node.listType as string) === 'number'
      return (
        children
          .map((child, i) => {
            const prefix = ordered ? `${i + 1}. ` : '- '
            return prefix + lexicalToMarkdown(child)
          })
          .join('\n') + '\n\n'
      )
    }
    case 'listitem':
      return childText()
    case 'quote':
      return '> ' + childText() + '\n\n'
    case 'code':
      return `\`\`\`\n${childText()}\n\`\`\`\n\n`
    default:
      return childText() // unknown — extract text, no wrapper
  }
}

function walkBlock(val: unknown): unknown {
  if (isLexical(val)) return lexicalToMarkdown(val.root as Record<string, unknown>)

  if (Array.isArray(val)) return val.map(walkBlock)

  if (typeof val === 'object' && val !== null) {
    return Object.fromEntries(
      Object.entries(val as Record<string, unknown>).map(([k, v]) => [k, walkBlock(v)]),
    )
  }

  return val
}

export const getPageBlock = {
  name: 'getPageBlock',
  description:
    'Fetch the full content of a single layout block from a page, with rich text serialized to Markdown.',
  parameters: {
    id: z.string().describe('Page document ID'),
    blockIndex: z.number().describe('Zero-based index of the block in the layout array'),
    locale: z.string().optional().describe('Locale code, e.g. "en" or "es". Omit for default.'),
  },
  handler: async (args: Record<string, unknown>, req: PayloadRequest) => {
    const { id, blockIndex, locale } = args as { id: string; blockIndex: number; locale?: string }
    const doc = await req.payload.findByID({
      collection: 'page',
      id,
      overrideAccess: false,
      req,
      depth: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(locale ? { locale: locale as any } : {}),
    })

    const blocks = doc.blocks
    if (!blocks || blockIndex < 0 || blockIndex >= blocks.length) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error: blockIndex ${blockIndex} is out of bounds. Page has ${blocks?.length ?? 0} blocks.`,
          },
        ],
      }
    }

    const block = walkBlock(blocks[blockIndex])

    return {
      content: [
        { type: 'text' as const, text: JSON.stringify(block) },
        { type: 'text' as const, text: VERBATIM_INSTRUCTION },
      ],
    }
  },
}
