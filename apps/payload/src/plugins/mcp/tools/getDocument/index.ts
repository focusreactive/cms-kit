import { z } from 'zod'
import type { CollectionSlug, PayloadRequest } from 'payload'
import type { Locale } from '@/core/types'
import type { BaseDocument, McpTool } from '../../types'
import type { McpToolsRegistry } from '../index'
import { buildContent } from './buildContent'

async function fetchDocument(
  collection: CollectionSlug,
  id: string,
  req: PayloadRequest,
  locale?: Locale,
  full?: boolean,
): Promise<BaseDocument> {
  return req.payload.findByID({
    collection,
    id,
    overrideAccess: false,
    req,
    depth: full ? 2 : 1,
    locale,
  }) as unknown as Promise<BaseDocument>
}

export function createGetDocumentTool(
  registry: McpToolsRegistry,
  knownCollections: Set<CollectionSlug>,
  baseSkipKeys: Set<string>,
): McpTool {
  const knownSlugs = [...knownCollections].join(', ')

  return {
    name: 'getDocument',
    description: `Fetch a collection document by ID. Specify collectionSlug (one of: ${knownSlugs}). Returns all top-level fields as a structured overview — complex fields (arrays, blocks, relations, rich text) are summarized with their type and item count. Use getAllDocuments to list documents first, then this tool by ID. Use getField to drill into specific fields. Do NOT pass full: true unless the user explicitly asks to extract the entire content. Pass raw: true to get the full raw JSON — use this when you need structured data for analysis or to construct an update payload. The response is pre-formatted Markdown — output it verbatim without reformatting or summarizing.`,
    parameters: {
      collectionSlug: z.string().describe(`The collection slug. One of: ${knownSlugs}`),
      id: z.string().describe('Document ID'),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      full: z
        .boolean()
        .optional()
        .describe(
          'Only pass full: true when the user explicitly asks to extract the entire document content. Expands all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a much larger response — omit by default.',
        ),
      raw: z
        .boolean()
        .optional()
        .describe(
          'Return the raw JSON document instead of formatted Markdown. Use this when you need all field values, IDs, and Lexical node structure — for example, to extract structured data for analysis or passing back in an update call.',
        ),
    },
    handler: async (args, req) => {
      const { collectionSlug, id, locale, full, raw } = args as {
        collectionSlug: string
        id: string
        locale?: Locale
        full?: boolean
        raw?: boolean
      }

      const config = registry.collections[collectionSlug as CollectionSlug]
      if (!config) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: unknown collectionSlug "${collectionSlug}". Known collections: ${knownSlugs}`,
            },
          ],
        }
      }

      const collection = collectionSlug as CollectionSlug
      const effectiveSkipKeys = new Set([...baseSkipKeys, ...(config.skipKeys ?? [])])

      const doc = await fetchDocument(collection, id, req, locale, full)

      const content = buildContent({
        doc,
        skipKeys: effectiveSkipKeys,
        collection,
        titleField: config.titleField,
        payload: req.payload,
        full,
        raw,
        locale,
        buildUrl: config.buildUrl,
      })

      return { content }
    },
  }
}
