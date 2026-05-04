import { z } from 'zod'
import type { CollectionSlug, Where } from 'payload'
import type { Locale } from '@/core/types'
import type { BaseDocument, McpTool } from '../../types'
import type { McpToolsRegistry } from '../index'
import { buildDocumentsContent } from './buildDocumentsContent'

export function createGetAllDocumentsTool(
  registry: McpToolsRegistry,
  knownCollections: Set<CollectionSlug>,
): McpTool {
  const knownSlugs = [...knownCollections].join(', ')

  return {
    name: 'getAllDocuments',
    description: `List collection documents as a formatted summary. Specify collectionSlug (one of: ${knownSlugs}). Returns only scalar summary fields plus admin URL and public URL (where applicable). Objects, relations, arrays, and rich text are omitted from the list output. To get full details for a document, call getDocument with its ID. The response is pre-formatted Markdown — output it verbatim without reformatting or summarizing.`,
    parameters: {
      collectionSlug: z.string().describe(`The collection slug. One of: ${knownSlugs}`),
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
        collectionSlug,
        limit = 10,
        page,
        locale,
        where,
      } = args as {
        collectionSlug: string
        limit?: number
        page?: number
        locale?: Locale
        where?: string
      }

      const config = registry.collections[collectionSlug as CollectionSlug]
      if (!config) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: unknown collectionSlug "${collectionSlug}". Known collections: ${knownSlugs}`,
            },
          ],
        }
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

      const collection = collectionSlug as CollectionSlug

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
        titleField: config.titleField,
        tableFields: config.tableFields,
        locale,
        payload: req.payload,
        buildUrl: config.buildUrl,
      })

      return { content }
    },
  }
}
