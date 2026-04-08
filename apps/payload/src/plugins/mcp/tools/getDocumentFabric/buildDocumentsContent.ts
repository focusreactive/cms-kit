import type { CollectionSlug, Payload } from 'payload'
import { getServerSideURL } from '@/core/lib/getURL'
import { formatDocument } from '../../utils/markdown/formatDocument'
import { resolveTitleField } from '../../utils/resolveTitleField'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { Locale } from '@/core/types'
import { BaseDocument, ContentBlock } from '../../types'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'
import { isScalar } from '../../utils/field/is'
import { findCollectionField } from '../../utils/field/findCollectionField'

interface Props {
  docs: BaseDocument[]
  totalDocs: number
  page?: number
  limit: number
  collection: CollectionSlug
  collectionPascal: string
  titleField?: string
  tableFields: string[]
  locale?: Locale
  payload: Payload
  buildUrl?: (doc: BaseDocument, locale?: Locale) => string | null
}

export function buildDocumentsContent({
  docs,
  totalDocs,
  page,
  limit,
  collection,
  collectionPascal,
  titleField,
  tableFields,
  locale,
  payload,
  buildUrl,
}: Props): ContentBlock[] {
  const { fieldLabels, blockLabels } = buildLabelMaps(collection, payload)
  const titleIsId = titleField === 'id' || !titleField

  const formattedDocs = docs.map((doc) => {
    const raw = doc as BaseDocument

    const adminUrl = raw.id
      ? `${getServerSideURL()}/admin/collections/${collection}/${raw.id}${locale ? `?locale=${locale}` : ''}`
      : ''
    const url = buildUrl ? (buildUrl(raw, locale) ?? '') : undefined

    return formatDocument({
      id: raw.id as string,
      title: resolveTitleField(raw, titleField),
      titleIsId,
      url,
      adminUrl,
      extractedDoc: buildSummaryFields(payload, collection, raw, tableFields, titleField),
      collectionPascal,
      fieldLabels,
      blockLabels,
    })
  })

  const start = totalDocs === 0 ? 0 : ((page ?? 1) - 1) * limit + 1
  const end = totalDocs === 0 ? 0 : start + formattedDocs.length - 1

  const documents = formattedDocs.length === 0 ? 'No documents found.' : formattedDocs.join('\n\n')
  const pagination = `Showing ${start}-${end} of ${totalDocs} total. Use \`page\` and \`limit\` to paginate.`
  const followUp = `To get full details for a document, call \`get${collectionPascal}Content\` with its ID.`

  const body = [documents, pagination, followUp].join('\n\n')

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}

function shouldIncludeSummaryField(
  payload: Payload,
  collection: CollectionSlug,
  fieldName: string,
  value: unknown,
) {
  if (!isScalar(value)) return false

  const field = findCollectionField(payload, collection, fieldName)
  if (!field || !('type' in field)) return true

  return true
}

function buildSummaryFields(
  payload: Payload,
  collection: CollectionSlug,
  doc: BaseDocument,
  tableFields: string[],
  titleField?: string,
) {
  const summary: Record<string, unknown> = {}

  for (const fieldName of tableFields) {
    if (fieldName === 'id' || fieldName === titleField) continue

    const value = doc[fieldName]

    if (!shouldIncludeSummaryField(payload, collection, fieldName, value)) continue

    summary[fieldName] = value
  }

  return summary
}
