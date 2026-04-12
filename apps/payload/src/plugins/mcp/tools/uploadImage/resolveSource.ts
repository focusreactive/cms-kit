import { readFile } from 'fs/promises'
import path from 'path'
import { detectMimeType } from './detectMimeType'

export async function resolveSource(
  source: string,
  filenameOverride?: string,
): Promise<{ buffer: Buffer; mimeType: string; filename: string }> {
  const isUrl = source.startsWith('http://') || source.startsWith('https://')

  if (isUrl) {
    const response = await fetch(source)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const detectedMimeType = detectMimeType(buffer)
    const basename = path.basename(new URL(source).pathname)
    const filename =
      filenameOverride ?? (basename || `upload-${Date.now()}.${detectedMimeType.ext}`)

    return {
      buffer,
      mimeType: detectedMimeType.mime,
      filename,
    }
  }

  let buffer: Buffer
  try {
    buffer = await readFile(source)
  } catch (err) {
    throw new Error(`Failed to read file "${source}": ${err instanceof Error ? err.message : String(err)}`)
  }

  const detectedMimeType = detectMimeType(buffer)
  const filename = filenameOverride ?? path.basename(source)

  return {
    buffer,
    mimeType: detectedMimeType.mime,
    filename,
  }
}
