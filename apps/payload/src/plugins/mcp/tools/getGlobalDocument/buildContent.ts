import type { GlobalSlug, Payload } from 'payload'
import { getServerSideURL } from '@/core/lib/getURL'
import { formatDocument } from '../../utils/markdown/formatDocument'
import { extractFields } from '../../utils/field/extractFields'
import { buildLabelMaps } from '../../utils/field/buildLabelMaps'
import { resolvePath } from '../../utils/resolvePath'
import { Locale } from '@/core/types'
import { BaseDocument, ContentBlock } from '../../types'
import { PRE_FORMATTED_CONTENT_INSTRUCTION } from '../../constants/instructions'

interface Props {
  doc: BaseDocument
  skipKeys: Set<string>
  slug: GlobalSlug
  titleField?: string
  payload: Payload
  full?: boolean
  raw?: boolean
  locale?: Locale
}

function resolveGlobalTitle(doc: BaseDocument, titleField: string | undefined, slug: GlobalSlug) {
  if (titleField) {
    const result = resolvePath(doc, titleField)

    if (
      !('error' in result) &&
      result.value !== null &&
      result.value !== undefined &&
      typeof result.value !== 'object'
    ) {
      return String(result.value)
    }
  }

  return String(slug)
}

export function buildContent({
  doc,
  skipKeys,
  slug,
  titleField,
  payload,
  full,
  raw,
  locale,
}: Props): ContentBlock[] {
  if (raw) {
    return [{ type: 'text', text: JSON.stringify(doc, null, 2) }]
  }

  const title = resolveGlobalTitle(doc, titleField, slug)
  const adminUrl = `${getServerSideURL()}/admin/globals/${slug}${locale ? `?locale=${locale}` : ''}`
  const extractedDoc = extractFields(doc, skipKeys)
  const { fieldLabels, blockLabels, fieldRelationTo } = buildLabelMaps(slug, payload, 'global')

  const body = formatDocument({
    title,
    titleIsId: false,
    adminUrl,
    extractedDoc,
    collectionSlug: String(slug),
    fieldLabels,
    blockLabels,
    fieldRelationTo,
    summarizeComplexValues: !full,
  })

  return [{ type: 'text', text: PRE_FORMATTED_CONTENT_INSTRUCTION + body }]
}
