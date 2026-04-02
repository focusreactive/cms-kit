import { isBlocksArray, isRelation, isScalar } from '../field/is'
import { isLexicalField } from '../lexical/isLexicalField'
import { lexicalToPlainText } from '../lexical/lexicalToPlainText'

function deriveBlockPreview(block: Record<string, unknown>, skipKeys: Set<string>): string {
  const queue: unknown[] = [block]
  while (queue.length > 0) {
    const node = queue.shift()
    if (node === null || node === undefined) continue
    if (typeof node === 'string' && node.trim().length > 0) {
      return node.trim().slice(0, 100)
    }
    if (typeof node === 'object') {
      if (Array.isArray(node)) {
        queue.push(...node)
      } else {
        for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
          if (!skipKeys.has(k)) queue.push(v)
        }
      }
    }
  }
  return ''
}

interface Props {
  name: string
  value: unknown
  collectionPascal: string
  richTextPreviewLength: number
  index: number
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
}

export function formatFieldCell({
  name,
  value,
  collectionPascal,
  richTextPreviewLength,
  index,
  fieldLabels,
  blockLabels,
}: Props) {
  const label = fieldLabels[name] ?? name
  const nameLine = label !== name ? `### [${index}] ${label} (${name})` : `### [${index}] ${name}`
  const lines: string[] = [nameLine]

  if (isScalar(value)) {
    lines.push(`Value: ${String(value ?? '')}`)
  } else if (isLexicalField(value)) {
    const preview = lexicalToPlainText(value.root).slice(0, richTextPreviewLength)

    lines.push(`Value: ${preview}...`)
    lines.push(`Hint: Call get${collectionPascal}Field with path="${name}" for full rich text`)
  } else if (Array.isArray(value)) {
    const isBlocks = isBlocksArray(value)

    if (isBlocks) {
      const blockLines = value.map((block, i) => {
        const blockLabel = blockLabels[block.blockType as string] ?? block.blockType
        const titleLine = `- ${blockLabel} [${i}]:`

        const preview = deriveBlockPreview(block, new Set())
        const previewLine = `Preview: ${preview}`

        const blockCellLines = [titleLine, previewLine]

        return blockCellLines.join('\n')
      })

      lines.push(`Blocks List:\n${blockLines.join('\n')}`, '\n')
      lines.push(
        `Hint: Call get${collectionPascal}Field with path="${name}.{index}" for full block content`,
      )
    } else {
      lines.push(
        `Hint: Call get${collectionPascal}Field with path="${name}.{index}" for a specific item`,
      )
    }
  } else if (isRelation(value)) {
    lines.push(`Hint: Call get${value.name}Content with id="${value.id}" for full content`)
  } else if (typeof value === 'object' && value !== null) {
    lines.push(`Hint: Call get${collectionPascal}Field with path="${name}" for full content`)
  }

  lines.push('---')

  return lines.join('\n')
}
