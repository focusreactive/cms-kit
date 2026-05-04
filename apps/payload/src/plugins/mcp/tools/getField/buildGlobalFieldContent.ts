import type { GlobalSlug, Payload } from 'payload'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { formatDocumentField } from '../../utils/markdown/formatDocumentField'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'
import { ContentBlock } from '../../types'

interface Props {
  fieldPath: string
  value: unknown
  slug: GlobalSlug
  payload: Payload
  raw?: boolean
}

export function buildGlobalFieldContent({
  fieldPath,
  value,
  slug,
  payload,
  raw,
}: Props): ContentBlock[] {
  if (raw) {
    return [{ type: 'text', text: JSON.stringify(value, null, 2) }]
  }

  const { fieldLabels, blockLabels, fieldRelationTo } = buildLabelMaps(slug, payload, 'global')

  const body = formatDocumentField(fieldPath, value, {
    collectionSlug: String(slug),
    fieldLabels,
    blockLabels,
    fieldRelationTo,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
