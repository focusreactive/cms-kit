import { LexicalNode } from '../../types/lexical'
import { isBlocksArray, isObjectsArray, isRelation, isScalar } from '../field/is'
import { isLexicalField } from '../lexical/isLexicalField'
import { lexicalToMarkdown } from '../lexical/lexicalToMarkdown'
import { formatFieldValueClue, formatRelationValueClue } from './formatValueClue'

const LIST_INDENT = '    '

function isResolvedRelation(value: Record<string, unknown>): boolean {
  return Object.keys(value).some((k) => k !== 'id' && k !== 'relationTo')
}

function formatEmptyValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return 'null'
  }

  return String(value)
}

function formatLexicalContent(value: unknown): string {
  const content = lexicalToMarkdown((value as { root: unknown }).root as LexicalNode).trim()

  return content || 'null'
}

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

  const indent = LIST_INDENT.repeat(depth)
  const childIndent = LIST_INDENT.repeat(depth + 1)
  const label = fieldLabels[key] ?? key

  if (isScalar(value)) {
    return `${indent}- **${label}**: ${formatEmptyValue(value)}`
  }

  if (isLexicalField(value)) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const indentedContent = formatLexicalContent(value)
      .split('\n')
      .map((line) => `${childIndent}${line}`)
      .join('\n')

    return `${indent}- **${label}**:\n${indentedContent}`
  }

  if (isRelation(value)) {
    if (!summarizeComplexValues && isResolvedRelation(value)) {
      const fields = Object.entries(value)
        .filter(([k]) => k !== 'id' && k !== 'relationTo')
        .map(([k, v]) => formatFieldLine(k, v, depth + 1, options))
        .join('\n')
      const idLine = `${childIndent}- **id**: ${formatEmptyValue(value.id)}`

      return fields
        ? `${indent}- **${label}**:\n${idLine}\n${fields}`
        : `${indent}- **${label}**:\n${idLine}`
    }
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
          .map(([key, value]) => formatFieldLine(key, value, depth + 2, options))
          .join('\n')

        return fields ? `${header}\n${fields}` : header
      })
      .join('\n')

    return `${indent}- **${label}**:${items ? `\n${items}` : ' null'}`
  }

  if (isObjectsArray(value)) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const items = value
      .map((item, i) => {
        const header = `${childIndent}- [${i}]:`
        const fields = Object.entries(item)
          .map(([key, value]) => formatFieldLine(key, value, depth + 2, options))
          .join('\n')

        return fields ? `${header}\n${fields}` : header
      })
      .join('\n')

    return `${indent}- **${label}**:${items ? `\n${items}` : ' null'}`
  }

  if (typeof value === 'object' && value !== null) {
    if (summarizeComplexValues) {
      return `${indent}- **${label}**: ${formatFieldValueClue(value, collectionPascal, fieldPath, knownCollectionPascals)}`
    }

    const fields = Object.entries(value as Record<string, unknown>)
      .map(([key, value]) => formatFieldLine(key, value, depth + 1, options))
      .join('\n')

    return `${indent}- **${label}**:${fields ? `\n${fields}` : ' null'}`
  }

  return `${indent}- **${label}**: ${formatEmptyValue(value)}`
}
