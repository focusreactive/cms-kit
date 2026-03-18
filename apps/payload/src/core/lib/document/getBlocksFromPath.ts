export function getBlocksFromPath<T = Record<string, unknown>>(
  doc: Record<string, unknown>,
  path: string,
): T[] {
  const segments = path.split('.')

  let current: unknown[] = [doc]

  for (const segment of segments) {
    const next: unknown[] = []

    for (const item of current) {
      if (item == null || typeof item !== 'object') continue

      const value = (item as Record<string, unknown>)[segment]

      if (Array.isArray(value)) {
        next.push(...value)
      } else if (value != null) {
        next.push(value)
      }
    }

    current = next
  }

  return current as T[]
}
