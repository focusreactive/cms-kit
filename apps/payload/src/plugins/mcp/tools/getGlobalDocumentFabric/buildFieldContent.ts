import type { GlobalSlug, Payload } from 'payload'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { formatDocumentField } from '../../utils/markdown/formatDocumentField'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'
import { ContentBlock } from '../../types'

interface Props {
  fieldPath: string
  value: unknown
  slug: GlobalSlug
  globalPascal: string
  payload: Payload
  knownCollectionPascals?: Set<string>
  raw?: boolean
}

export function buildFieldContent({
  fieldPath,
  value,
  slug,
  globalPascal,
  payload,
  knownCollectionPascals,
  raw,
}: Props): ContentBlock[] {
  if (raw) {
    return [{ type: 'text', text: JSON.stringify(value, null, 2) }]
  }

  const { fieldLabels, blockLabels } = buildLabelMaps(slug, payload, 'global')

  const body = formatDocumentField(fieldPath, value, {
    collectionPascal: globalPascal,
    fieldLabels,
    blockLabels,
    knownCollectionPascals,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
