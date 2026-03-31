export function isScalar(val: unknown): val is string | number | boolean | null {
  return (
    val === null || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
  )
}
