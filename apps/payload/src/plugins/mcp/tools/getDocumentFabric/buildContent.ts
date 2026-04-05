import type { CollectionSlug, Payload } from 'payload'
import { getServerSideURL } from '@/core/lib/getURL'
import { formatDocument } from '../../utils/markdown/formatDocument'
import { resolveTitleField } from '../../utils/resolveTitleField'
import { extractFields } from '../../utils/field/extractFields'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { Locale } from '@/core/types'
import { BaseDocument, ContentBlock } from '../../types'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'

interface Props {
  doc: BaseDocument
  skipKeys: Set<string>
  collectionPascal: string
  collection: CollectionSlug
  titleField?: string
  payload: Payload
  knownCollectionPascals?: Set<string>
  full?: boolean
  locale?: Locale
  buildUrl?: (doc: BaseDocument, locale?: Locale) => string | null
}

export function buildContent({
  doc,
  skipKeys,
  collectionPascal,
  collection,
  titleField,
  payload,
  knownCollectionPascals,
  full,
  locale,
  buildUrl,
}: Props): ContentBlock[] {
  const title = resolveTitleField(doc, titleField)
  const titleIsId = titleField === 'id' || !titleField

  const url = buildUrl ? buildUrl(doc, locale) : null
  const adminUrl =
    doc.id && collection
      ? `${getServerSideURL()}/admin/collections/${collection}/${doc.id}${locale ? `?locale=${locale}` : ''}`
      : null

  const extractedDoc = extractFields(doc, skipKeys)

  const { fieldLabels, blockLabels } = buildLabelMaps(collection, payload)

  const body = formatDocument({
    id: doc.id as string,
    title,
    titleIsId,
    url,
    adminUrl,
    extractedDoc,
    collectionPascal,
    fieldLabels,
    blockLabels,
    knownCollectionPascals,
    summarizeComplexValues: !full,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
