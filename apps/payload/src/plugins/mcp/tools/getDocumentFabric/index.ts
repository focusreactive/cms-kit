import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { isLexicalField } from '../../utils/lexical/isLexicalField'
import { walkBlock, resolvePath } from '../../utils/resolvePath'
import { lexicalToMarkdown } from '../../utils/lexical/lexicalToMarkdown'
import { buildContent } from './buildContent'

export interface DocumentFabricOptions {
  collection: string
  titleField?: string
  skipKeys?: string[]
  richTextPreviewLength?: number
  buildUrl?: (doc: Record<string, unknown>) => string | null
}

const SKIP_KEYS = new Set([
  'id',
  'blockType',
  'blockName',
  'url',
  'locale',
  'createdAt',
  'updatedAt',
])

function toPascalCase(collection: string) {
  return collection
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

async function getDocument(
  collection: string,
  id: string,
  req: PayloadRequest,
  locale?: string,
): Promise<Record<string, unknown>> {
  return req.payload.findByID({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: collection as any,
    id,
    overrideAccess: false,
    req,
    depth: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(locale ? { locale: locale as any } : {}),
  }) as unknown as Promise<Record<string, unknown>>
}

type McpTool = {
  name: string
  description: string
  parameters: Record<string, unknown>
  handler: (
    args: Record<string, unknown>,
    req: PayloadRequest,
  ) => Promise<{ content: { type: 'text'; text: string }[] }>
}

export function getDocumentFabric(options: DocumentFabricOptions): [McpTool, McpTool] {
  const {
    collection,
    buildUrl,
    skipKeys: extraSkipKeys,
    richTextPreviewLength = 300,
    titleField,
  } = options
  const collectionPascal = toPascalCase(collection)
  const effectiveSkipKeys = new Set([...SKIP_KEYS, ...(extraSkipKeys ?? [])])

  const parameters = {
    id: z.string().describe('Document ID'),
    locale: z
      .string()
      .optional()
      .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
  }

  const mainTool: McpTool = {
    name: `get${collectionPascal}Content`,
    description: `Fetch a ${collection} document by ID. Returns all top-level fields as structured sections. Rich text and array fields include a hint to call get${collectionPascal}Field for full content. The response is pre-formatted Markdown — output it verbatim without reformatting or summarizing.`,
    parameters,
    handler: async (args, req) => {
      const { id, locale } = args as { id: string; locale?: string }
      const doc = await getDocument(collection, id, req, locale)

      const content = buildContent(
        doc,
        effectiveSkipKeys,
        richTextPreviewLength,
        collectionPascal,
        collection,
        titleField,
        buildUrl,
      )

      return { content }
    },
  }

  const fieldTool: McpTool = {
    name: `get${collectionPascal}Field`,
    description: `Fetch the full content of a specific field from a ${collection} document. Use dot-notation for nested paths (e.g. "content", "blocks.0", "meta.description"). Rich text fields are returned as Markdown.`,
    parameters: {
      id: z.string().describe('Document ID'),
      fieldPath: z
        .string()
        .describe('Dot-notation path to the field, e.g. "content" or "blocks.2"'),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
    },
    handler: async (args, req) => {
      const { id, fieldPath, locale } = args as { id: string; fieldPath: string; locale?: string }
      const doc = await getDocument(collection, id, req, locale)

      const resolved = resolvePath(doc, fieldPath)

      if ('error' in resolved) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${resolved.error}` }],
        }
      }

      const { value } = resolved
      let text: string

      if (isLexicalField(value)) {
        text = lexicalToMarkdown(value.root)
      } else if (Array.isArray(value)) {
        const walked = walkBlock(value) as unknown[]
        text = walked
          .map((item, i) => {
            if (typeof item === 'object' && item !== null) {
              const rows = Object.entries(item as Record<string, unknown>).map(
                ([k, v]) =>
                  `| ${k} | ${typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')} |`,
              )
              return [`### [${i}]`, '| Field | Value |', '|-------|-------|', ...rows].join('\n')
            }
            return `### [${i}]\n${String(item ?? '')}`
          })
          .join('\n\n')
      } else if (typeof value === 'object' && value !== null) {
        const walked = walkBlock(value) as Record<string, unknown>
        const rows = Object.entries(walked).map(
          ([k, v]) =>
            `| ${k} | ${typeof v === 'object' ? JSON.stringify(v) : String(v ?? '')} |`,
        )
        text = ['| Field | Value |', '|-------|-------|', ...rows].join('\n')
      } else {
        text = String(value ?? '')
      }

      return {
        content: [{ type: 'text' as const, text }],
      }
    },
  }

  return [mainTool, fieldTool]
}
