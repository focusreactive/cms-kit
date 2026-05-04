import type { CollectionSlug, Payload } from 'payload'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { formatDocumentField } from '../../utils/markdown/formatDocumentField'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'
import { ContentBlock } from '../../types'

interface Props {
  fieldPath: string
  value: unknown
  collection: CollectionSlug
  documentId?: string
  payload: Payload
  raw?: boolean
}

export function buildCollectionFieldContent({
  fieldPath,
  value,
  collection,
  documentId,
  payload,
  raw,
}: Props): ContentBlock[] {
  if (raw) {
    return [{ type: 'text', text: JSON.stringify(value, null, 2) }]
  }

  const { fieldLabels, blockLabels, fieldRelationTo } = buildLabelMaps(collection, payload)

  const body = formatDocumentField(fieldPath, value, {
    collectionSlug: String(collection),
    documentId,
    fieldLabels,
    blockLabels,
    fieldRelationTo,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
