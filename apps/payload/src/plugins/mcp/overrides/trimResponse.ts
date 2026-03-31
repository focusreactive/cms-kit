import type { PayloadRequest } from 'payload'
import type { Page } from '@/payload-types'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { getServerSideURL } from '@/core/lib/getURL'

type McpResponse = {
  content: Array<{
    text: string
    type: string
  }>
}

const PAGE_KEEP_FIELDS = new Set(['id', 'title', 'slug', '_status', 'updatedAt', 'createdAt'])

const POST_KEEP_FIELDS = new Set([
  'id',
  'title',
  'slug',
  '_status',
  'updatedAt',
  'createdAt',
  'excerpt',
  'publishedAt',
])

function slim(doc: Record<string, unknown>, keepFields: Set<string>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(doc).filter(([key]) => keepFields.has(key)))
}

function withLinks(
  slimDoc: Record<string, unknown>,
  serverURL: string,
  collection: string,
  clientUrl: string | undefined,
): Record<string, unknown> {
  const id = slimDoc.id as string | undefined
  return {
    ...slimDoc,
    ...(id ? { adminUrl: `${serverURL}/admin/collections/${collection}/${id}` } : {}),
    ...(clientUrl ? { url: clientUrl } : {}),
  }
}

const VERBATIM_INSTRUCTION =
  'IMPORTANT: Transform the JSON above into a table for the user. Show ALL fields from the JSON in the table — do not omit any fields. Then show the follow-up text below the table.'

function trimDocs(
  doc: Record<string, unknown>,
  followUp: string,
  keepFields: Set<string>,
  serverURL: string,
  collection: string,
  buildClientUrl: (d: Record<string, unknown>) => string | undefined,
): McpResponse | null {
  if ('docs' in doc && Array.isArray(doc.docs)) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            (doc.docs as Record<string, unknown>[]).map((d) =>
              withLinks(slim(d, keepFields), serverURL, collection, buildClientUrl(d)),
            ),
          ),
        },
        { type: 'text', text: VERBATIM_INSTRUCTION },
        { type: 'text', text: followUp },
      ],
    }
  }

  if ('id' in doc) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            withLinks(slim(doc, keepFields), serverURL, collection, buildClientUrl(doc)),
          ),
        },
        { type: 'text', text: VERBATIM_INSTRUCTION },
        { type: 'text', text: followUp },
      ],
    }
  }

  return null
}

export function trimPageResponse(
  response: McpResponse,
  doc: Record<string, unknown>,
  req: PayloadRequest,
): McpResponse {
  const serverURL = getServerSideURL()
  const locale = (req.locale as string) ?? 'en'
  const buildClientUrl = (d: Record<string, unknown>) =>
    buildUrl({
      collection: 'page',
      breadcrumbs: d.breadcrumbs as Page['breadcrumbs'],
      locale,
    })
  return (
    trimDocs(
      doc,
      'Would you like more details about the page content?',
      PAGE_KEEP_FIELDS,
      serverURL,
      'page',
      buildClientUrl,
    ) ?? response
  )
}

export function trimPostResponse(
  response: McpResponse,
  doc: Record<string, unknown>,
  req: PayloadRequest,
): McpResponse {
  const serverURL = getServerSideURL()
  const locale = (req.locale as string) ?? 'en'
  const buildClientUrl = (d: Record<string, unknown>) =>
    buildUrl({
      collection: 'posts',
      slug: d.slug as string | undefined,
      locale,
    })
  return (
    trimDocs(
      doc,
      'Would you like more details about the post content?',
      POST_KEEP_FIELDS,
      serverURL,
      'posts',
      buildClientUrl,
    ) ?? response
  )
}
