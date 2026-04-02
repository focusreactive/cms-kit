import { formatFieldCell } from './formatFieldCell'

interface Props {
  id?: number | string
  title: string
  titleIsId: boolean
  url?: string | null
  adminUrl?: string | null
  extractedDoc: Record<string, unknown>
  richTextPreviewLength: number
  collectionPascal: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
}

export function formatDocument({
  id,
  title,
  titleIsId,
  url,
  adminUrl,
  extractedDoc,
  richTextPreviewLength,
  collectionPascal,
  fieldLabels,
  blockLabels,
}: Props) {
  const titleLine = titleIsId ? `# ${title}` : id ? `# ${title} | ${id}` : `# ${title}`
  const urlLine = [adminUrl, url].filter(Boolean).join(' | ')
  const fieldsTitleLine = `## Fields:`

  const fieldCellLines: string[] = []

  Object.entries(extractedDoc).forEach(([name, value], i) => {
    fieldCellLines.push(
      formatFieldCell({
        name,
        value,
        collectionPascal,
        richTextPreviewLength,
        index: i + 1,
        fieldLabels,
        blockLabels,
      }),
    )
  })

  return [titleLine, urlLine, fieldsTitleLine, ...fieldCellLines].filter(Boolean).join('\n\n')
}
