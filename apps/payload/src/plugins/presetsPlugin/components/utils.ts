export function getParentPath(path: string): string {
  const parts = path.split('.')
  parts.pop()
  return parts.join('.')
}

export function getPresetTypeFromPath(parentPath: string, validTypes: string[]): string | null {
  const last = parentPath.split('.').pop()
  if (last && validTypes.includes(last)) return last
  return null
}
