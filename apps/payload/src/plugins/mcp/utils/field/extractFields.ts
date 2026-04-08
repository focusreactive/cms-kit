import { BaseDocument } from '../../types'

export const extractFields = (obj: BaseDocument, skipKeys: Set<string>) => {
  const extracted: Record<string, unknown> = {}

  for (const [key, val] of Object.entries(obj)) {
    if (skipKeys.has(key)) continue

    extracted[key] = val
  }

  return extracted
}
