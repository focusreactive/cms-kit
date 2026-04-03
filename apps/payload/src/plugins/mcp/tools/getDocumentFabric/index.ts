import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { resolvePath } from '../../utils/resolvePath'
import { buildContent } from './buildContent'
import { buildFieldContent } from './buildFieldContent'

export interface DocumentFabricOptions {
  collection: string
  titleField?: string
  skipKeys?: string[]
  richTextPreviewLength?: number
  buildUrl?: (doc: Record<string, unknown>) => string | null
  knownCollectionPascals?: Set<string>
}

const SKIP_KEYS = new Set(['blockType', 'blockName', 'url', 'locale', 'createdAt', 'updatedAt'])

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
  full?: boolean,
): Promise<Record<string, unknown>> {
  return req.payload.findByID({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: collection as any,
    id,
    overrideAccess: false,
    req,
    depth: full ? 2 : 1,
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
    titleField,
    knownCollectionPascals,
  } = options
  const collectionPascal = toPascalCase(collection)
  const effectiveSkipKeys = new Set([...SKIP_KEYS, ...(extraSkipKeys ?? [])])

  const parameters = {
    id: z.string().describe('Document ID'),
    locale: z
      .string()
      .optional()
      .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
    full: z
      .boolean()
      .optional()
      .describe(
        'Pass full: true to expand all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a larger response.',
      ),
  }

  const mainTool: McpTool = {
    name: `get${collectionPascal}Content`,
    description: `Fetch a ${collection} document by ID. Returns all top-level fields as structured sections with nested values rendered inline. The response is pre-formatted Markdown - output it verbatim without reformatting or summarizing. Pass full: true to expand all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a larger response.`,
    parameters,
    handler: async (args, req) => {
      const { id, locale, full } = args as {
        id: string
        locale?: string
        full?: boolean
      }
      const doc = await getDocument(collection, id, req, locale, full)

      const content = buildContent(
        doc,
        effectiveSkipKeys,
        collectionPascal,
        collection,
        titleField,
        req.payload,
        buildUrl,
        knownCollectionPascals,
        full,
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

      const content = buildFieldContent(
        fieldPath,
        resolved.value,
        collection,
        collectionPascal,
        req.payload,
        knownCollectionPascals,
      )

      return { content }
    },
  }

  return [mainTool, fieldTool]
}
