import { formatFieldLine } from './formatFieldLine'

interface Props {
  id?: number | string
  title: string
  titleIsId: boolean
  url?: string | null
  adminUrl?: string | null
  extractedDoc: Record<string, unknown>
  collectionPascal: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  knownCollectionPascals?: Set<string>
}

export function formatDocument({
  id,
  title,
  titleIsId,
  url,
  adminUrl,
  extractedDoc,
  collectionPascal,
  fieldLabels,
  blockLabels,
  knownCollectionPascals,
}: Props) {
  const titleLine = titleIsId ? `# ${title}` : id ? `# ${title} | ${id}` : `# ${title}`
  const urlLine = [adminUrl, url].filter(Boolean).join(' | ')
  const fieldsTitleLine = `## Fields:`

  const fieldLines = Object.entries(extractedDoc).map(([name, value]) =>
    formatFieldLine(name, value, 0, {
      collectionPascal,
      fieldLabels,
      blockLabels,
      summarizeComplexValues: true,
      fieldPath: name,
      knownCollectionPascals,
    }),
  )

  return [titleLine, urlLine, fieldsTitleLine, ...fieldLines].filter(Boolean).join('\n\n')
}
