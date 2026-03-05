/**
 * Sets a nested value in an object by dot path (e.g. 'meta.title').
 * Creates intermediate objects as needed.
 */
export function setValueByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let current: Record<string, unknown> = obj

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    const next = current[key]
    if (next != null && typeof next === 'object' && !Array.isArray(next)) {
      current = next as Record<string, unknown>
    } else {
      const nextObj: Record<string, unknown> = {}
      current[key] = nextObj
      current = nextObj
    }
  }
  current[parts[parts.length - 1]] = value
}

/**
 * Gets a nested value by dot path. Returns undefined if path is missing.
 */
export function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const key of parts) {
    if (current == null || typeof current !== 'object' || Array.isArray(current)) {
      return undefined
    }
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

/**
 * Returns true if the value is empty (undefined, null, or blank string).
 */
export function isEmpty(value: unknown): boolean {
  if (!value) return true
  if (typeof value === 'string') return value.trim() === ''
  return false
}
