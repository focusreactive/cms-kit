export function toPascalCase(collection: string) {
  return collection
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}
