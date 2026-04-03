import { isBlocksArray, isObjectsArray, isRelation, isScalar } from '../field/is'
import { isLexicalField } from '../lexical/isLexicalField'
import { lexicalToMarkdown } from '../lexical/lexicalToMarkdown'
import { formatFieldLine } from './formatFieldLine'
import { formatRelationValueClue } from './formatValueClue'

interface FormatDocumentFieldOpts {
  collectionPascal: string
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  knownCollectionPascals?: Set<string>
}

export function formatFieldValue(value: unknown, options: FormatDocumentFieldOpts) {
  const { blockLabels, knownCollectionPascals } = options

  if (isLexicalField(value)) {
    return lexicalToMarkdown(value.root)
  }

  if (isScalar(value)) {
    return String(value ?? '')
  }

  if (isRelation(value)) {
    return formatRelationValueClue(value, knownCollectionPascals)
  }

  if (Array.isArray(value)) {
    const isBlocks = isBlocksArray(value)

    const items = value
      .map((item, i) => {
        if (isBlocks) {
          const block = item as Record<string, unknown>
          const blockLabel = blockLabels[block.blockType as string] ?? block.blockType
          const header = `- [${i}] ${String(blockLabel)}:`

          const fields = Object.entries(block)
            .filter(([key]) => key !== 'blockType' && key !== 'blockName' && key !== 'id')
            .map(([key, value]) => formatFieldLine(key, value, 2, options))
            .join('\n')

          return fields ? `${header}\n${fields}` : header
        }
        if (isObjectsArray([item])) {
          const header = `- [${i}]:`

          const fields = Object.entries(item as Record<string, unknown>)
            .map(([key, value]) => formatFieldLine(key, value, 2, options))
            .join('\n')

          return fields ? `${header}\n${fields}` : header
        }

        return `- [${i}]: ${String(item ?? '')}`
      })
      .join('\n\n')

    return [`## Items:`, '', items].join('\n')
  }

  const obj = value as Record<string, unknown>

  const fields = Object.entries(obj)
    .filter(([key]) => key !== 'blockType' && key !== 'blockName' && key !== 'id')
    .map(([key, value]) => formatFieldLine(key, value, 0, options))
    .join('\n')

  return [`## Fields:`, '', fields].join('\n')
}
