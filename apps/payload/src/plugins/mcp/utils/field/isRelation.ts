import { isScalar } from './isScalar'

export function isRelation(val: unknown) {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) return false

  const obj = val as Record<string, unknown>

  if (!('id' in obj)) return false

  return Object.entries(obj).some(([k, v]) => k !== 'id' && isScalar(v))
}
