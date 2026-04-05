import { z } from 'zod'
import type { CollectionSlug, PayloadRequest, Where } from 'payload'
import { Locale } from '@/core/types'
import { resolvePath } from '../../utils/resolvePath'
import { buildContent } from './buildContent'
import { buildFieldContent } from './buildFieldContent'
import { toPascalCase } from '../../utils/toPascalCase'
import { BaseDocument, McpTool } from '../../types'
import { buildDocumentsContent } from './buildDocumentsContent'

const SKIP_KEYS = new Set(['blockType', 'blockName', 'url', 'locale', 'createdAt', 'updatedAt'])

export interface DocumentFabricOptions {
  collection: CollectionSlug
  tableFields: string[]
  titleField?: string
  skipKeys?: string[]
  knownCollections?: Set<CollectionSlug>
  buildUrl?: (doc: BaseDocument, locale?: Locale) => string | null
}

async function getDocument(
  collection: CollectionSlug,
  id: string,
  req: PayloadRequest,
  locale?: Locale,
  full?: boolean,
) {
  return req.payload.findByID({
    collection,
    id,
    overrideAccess: false,
    req,
    depth: full ? 2 : 1,
    locale,
  }) as unknown as Promise<BaseDocument>
}

export function getDocumentFabric({
  collection,
  tableFields,
  skipKeys,
  titleField,
  knownCollections,
  buildUrl,
}: DocumentFabricOptions): [McpTool, McpTool, McpTool] {
  const collectionPascal = toPascalCase(collection)
  const knownCollectionPascals = knownCollections
    ? new Set([...knownCollections].map(toPascalCase))
    : undefined

  const effectiveSkipKeys = new Set([...SKIP_KEYS, ...(skipKeys ?? [])])

  const mainTool: McpTool = {
    name: `get${collectionPascal}Content`,
    description: `Fetch a ${collection} document by ID. Returns all top-level fields as structured sections with nested values rendered inline. The response is pre-formatted Markdown - output it verbatim without reformatting or summarizing. Pass full: true to expand all nested fields, arrays, rich text, and relations inline (uses depth 2). Produces a larger response.`,
    parameters: {
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
    },
    handler: async (args, req) => {
      const { id, locale, full } = args as {
        id: string
        locale?: Locale
        full?: boolean
      }

      const doc = await getDocument(collection, id, req, locale, full)

      const content = buildContent({
        doc,
        skipKeys: effectiveSkipKeys,
        collectionPascal,
        collection,
        titleField,
        payload: req.payload,
        knownCollectionPascals,
        full,
        locale,
        buildUrl,
      })

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
      const { id, fieldPath, locale } = args as { id: string; fieldPath: string; locale?: Locale }
      const doc = await getDocument(collection, id, req, locale)

      const resolved = resolvePath(doc, fieldPath)

      if ('error' in resolved) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${resolved.error}` }],
        }
      }

      const content = buildFieldContent({
        fieldPath,
        value: resolved.value,
        collection,
        collectionPascal,
        payload: req.payload,
        knownCollectionPascals,
      })

      return { content }
    },
  }

  const getAllTool: McpTool = {
    name: `getAll${collectionPascal}`,
    description: [
      `List ${collection} documents as a formatted summary list.`,
      titleField ? `The "${titleField}" field is the document title.` : '',
      `Returns only the necessary scalar summary fields from ${tableFields.join(', ')}, plus admin URL${buildUrl ? ' and public URL' : ''}.`,
      'Objects, relations, arrays and rich text are omitted from the list output.',
      `To get full details for a document, call \`get${collectionPascal}Content\` with its ID.`,
      'The response is pre-formatted Markdown - output it verbatim without reformatting or summarizing.',
    ]
      .filter(Boolean)
      .join(' '),
    parameters: {
      limit: z.number().optional().describe('Max documents to return (default 10)'),
      page: z.number().optional().describe('Page number for pagination'),
      locale: z
        .string()
        .optional()
        .describe('Locale code, e.g. "en" or "es". Omit to use the default locale.'),
      where: z
        .string()
        .optional()
        .describe(
          'Payload where clause as a JSON string, e.g. \'{"_status":{"equals":"published"}}\'',
        ),
    },
    handler: async (args, req) => {
      const {
        limit = 10,
        page,
        locale,
        where,
      } = args as {
        limit?: number
        page?: number
        locale?: Locale
        where?: string
      }

      let parsedWhere: Where | undefined
      if (where) {
        try {
          parsedWhere = JSON.parse(where) as Where
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)

          return {
            content: [{ type: 'text', text: `Error: invalid where JSON - ${msg}` }],
          }
        }
      }

      const result = await req.payload.find({
        collection,
        limit,
        page,
        where: parsedWhere,
        overrideAccess: false,
        req,
        depth: 0,
        locale,
      })

      const { docs, totalDocs, page: currentPage, limit: effectiveLimit } = result

      const content = buildDocumentsContent({
        docs: docs as BaseDocument[],
        totalDocs,
        limit: effectiveLimit,
        page: currentPage,
        collection,
        collectionPascal,
        titleField,
        tableFields,
        locale,
        payload: req.payload,
        buildUrl,
      })

      return { content }
    },
  }

  return [mainTool, fieldTool, getAllTool]
}
