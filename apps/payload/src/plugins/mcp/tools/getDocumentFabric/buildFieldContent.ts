import type { CollectionSlug, Payload } from 'payload'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { formatDocumentField } from '../../utils/markdown/formatDocumentField'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'
import { ContentBlock } from '../../types'

interface Props {
  fieldPath: string
  value: unknown
  collection: CollectionSlug
  collectionPascal: string
  payload: Payload
  knownCollectionPascals?: Set<string>
}

export function buildFieldContent({
  fieldPath,
  value,
  collection,
  collectionPascal,
  payload,
  knownCollectionPascals,
}: Props): ContentBlock[] {
  const { fieldLabels, blockLabels } = buildLabelMaps(collection, payload)

  const body = formatDocumentField(fieldPath, value, {
    collectionPascal,
    fieldLabels,
    blockLabels,
    knownCollectionPascals,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
