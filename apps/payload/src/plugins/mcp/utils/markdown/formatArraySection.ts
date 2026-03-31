import { isLexicalField } from '../lexical/isLexicalField'
import { getLexicalPreview } from '../lexical/getLexicalPreview'

function deriveBlockPreview(block: Record<string, unknown>, skipKeys: Set<string>) {
  let topLevelArrayCount: number | null = null

  for (const [key, val] of Object.entries(block)) {
    if (skipKeys.has(key)) continue

    if (isLexicalField(val)) {
      const preview = getLexicalPreview(val.root)
      if (preview) return preview
    }

    if (Array.isArray(val) && topLevelArrayCount === null) {
      topLevelArrayCount = val.length
    }
  }

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

  return topLevelArrayCount !== null ? `${topLevelArrayCount} items` : ''
}

export function formatArraySection(
  key: string,
  arr: unknown[],
  collectionPascal: string,
  skipKeys: Set<string>,
) {
  const isBlocksArray =
    arr.length > 0 &&
    typeof arr[0] === 'object' &&
    arr[0] !== null &&
    'blockType' in (arr[0] as Record<string, unknown>)

  if (isBlocksArray) {
    const lines = arr.map((block, index) => {
      const b = block as Record<string, unknown>
      const preview = deriveBlockPreview(b, skipKeys)

      return `- ${index} (${b.blockType as string})${preview ? ': ' + preview : ''}`
    })
    return (
      [`### ${key}`, lines.join('\n')].join('\n') +
      `\n\nHint: Call get${collectionPascal}Field with path="${key}.{index}" for full block content`
    )
  }

  return (
    [`### ${key}`, `${arr.length} items`].join('\n') +
    `\n\nHint: Call get${collectionPascal}Field with path="${key}.{index}" for a specific item`
  )
}
