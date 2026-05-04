import { formatFieldLine } from './formatFieldLine'

interface Props {
  id?: number | string
  title: string
  titleIsId: boolean
  url?: string | null
  adminUrl?: string | null
  extractedDoc: Record<string, unknown>
  collectionSlug: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  fieldRelationTo?: Record<string, string>
  summarizeComplexValues?: boolean
}

export function formatDocument({
  id,
  title,
  titleIsId,
  url,
  adminUrl,
  extractedDoc,
  collectionSlug,
  fieldLabels,
  blockLabels,
  fieldRelationTo,
  summarizeComplexValues = true,
}: Props) {
  const titleLine = titleIsId ? `# ${title}` : id ? `# ${title} | ${id}` : `# ${title}`
  const urlLine = [adminUrl, url].filter(Boolean).join(' | ') + '\n'
  const fieldsTitleLine = `## Fields:`

  const documentId = id !== undefined ? String(id) : undefined

  const fieldLines = Object.entries(extractedDoc).map(([name, value]) =>
    formatFieldLine(name, value, 0, {
      collectionSlug,
      documentId,
      fieldLabels,
      blockLabels,
      fieldRelationTo,
      summarizeComplexValues,
      fieldPath: name,
    }),
  )

  return [titleLine, urlLine, fieldsTitleLine, ...fieldLines].filter(Boolean).join('\n')
}
