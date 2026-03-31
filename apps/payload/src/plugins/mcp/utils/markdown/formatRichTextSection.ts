export function formatRichTextSection(key: string, preview: string, collectionPascal: string) {
  return [`### ${key}`, `Preview: ${preview}…`].join('\n') + `\n\nHint: Call get${collectionPascal}Field with path="${key}" for full rich text`
}
