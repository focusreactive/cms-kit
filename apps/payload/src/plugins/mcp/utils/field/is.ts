export function isObjectsArray(val: unknown): val is Record<string, unknown>[] {
  return Array.isArray(val) && val.every((item) => typeof item === 'object' && item !== null)
}

export function isBlocksArray(val: unknown): val is Record<string, unknown>[] {
  return isObjectsArray(val) && val.every((item) => 'blockType' in item)
}

export function isScalar(val: unknown): val is string | number | boolean | null {
  return (
    val === null || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
  )
}

export function isRelation(val: unknown): val is Record<string, unknown> {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) return false

  const obj = val as Record<string, unknown>

  if (!('id' in obj)) return false
  if ('blockType' in obj) return false

  return Object.entries(obj).some(([k, v]) => k !== 'id' && isScalar(v))
}
