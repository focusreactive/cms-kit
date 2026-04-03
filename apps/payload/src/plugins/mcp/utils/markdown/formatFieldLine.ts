import { isBlocksArray, isObjectsArray, isRelation, isScalar } from '../field/is'
import { isLexicalField } from '../lexical/isLexicalField'
import { lexicalToMarkdown } from '../lexical/lexicalToMarkdown'
import { formatFieldValueClue, formatRelationValueClue } from './formatValueClue'

interface FormatFieldLineOpts {
  collectionPascal: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  summarizeComplexValues?: boolean
  fieldPath?: string
  knownCollectionPascals?: Set<string>
}

export function formatFieldLine(
  key: string,
  value: unknown,
  depth: number,
  options: FormatFieldLineOpts,
): string {
  const {
    fieldLabels,
    blockLabels,
    fieldPath = key,
    summarizeComplexValues,
    collectionPascal,
    knownCollectionPascals,
  } = options

  const indent = '  '.repeat(depth)
  const childIndent = '  '.repeat(depth + 2)
  const label = fieldLabels[key] ?? key

  if (isScalar(value)) {
    return `${indent}- **${label}**: ${String(value ?? '')}`
  }

  if (isLexicalField(value)) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const content = lexicalToMarkdown(value.root)
    const indentedContent = content
      .split('\n')
      .map((line) => `${indent}  ${line}`)
      .join('\n')

    return `${indent}- **${label}**:\n\n${indentedContent}\n`
  }

  if (isRelation(value)) {
    return `${indent}- **${label}**: ${formatRelationValueClue(value, knownCollectionPascals)}`
  }

  if (isBlocksArray(value)) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const items = value
      .map((block, i) => {
        const blockLabel = blockLabels[block.blockType as string] ?? block.blockType
        const header = `${childIndent}- [${i}] ${String(blockLabel)}:`

        const fields = Object.entries(block)
          .filter(([key]) => key !== 'blockType' && key !== 'blockName' && key !== 'id')
          .map(([key, value]) => formatFieldLine(key, value, depth + 3, options))
          .join('\n')

        return fields ? `${header}\n${fields}` : header
      })
      .join('\n')

    return `${indent}- **${label}**:\n${items}`
  }

  if (isObjectsArray(value)) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const items = value
      .map((item, i) => {
        const header = `${childIndent}- [${i}]:`
        const fields = Object.entries(item)
          .map(([key, value]) => formatFieldLine(key, value, depth + 3, options))
          .join('\n')

        return fields ? `${header}\n${fields}` : header
      })
      .join('\n')

    return `${indent}- **${label}**:\n${items}`
  }

  if (typeof value === 'object' && value !== null) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const fields = Object.entries(value as Record<string, unknown>)
      .map(([key, value]) => formatFieldLine(key, value, depth + 2, options))
      .join('\n')

    return `${indent}- **${label}**:\n${fields}`
  }

  return `${indent}- **${label}**: ${String(value ?? '')}`
}
