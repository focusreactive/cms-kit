import { formatFieldValue } from './formatFieldValue'

interface FormatDocumentFieldOpts {
  collectionPascal: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  knownCollectionPascals?: Set<string>
}

export function formatDocumentField(
  fieldPath: string,
  value: unknown,
  opts: FormatDocumentFieldOpts,
): string {
  const blockType =
    typeof value === 'object' && value !== null && !Array.isArray(value)
      ? ((value as Record<string, unknown>).blockType as string | undefined)
      : undefined
  const headerSuffix = blockType ? ` (${opts.blockLabels[blockType] ?? blockType})` : ''

  return [`# ${fieldPath}${headerSuffix}`, '', formatFieldValue(value, opts)].join('\n')
}
