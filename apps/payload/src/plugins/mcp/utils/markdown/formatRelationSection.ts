import { isScalar } from '../field/isScalar'

function buildTable(obj: Record<string, unknown>) {
  const rows = Object.entries(obj)
    .filter(([, val]) => isScalar(val))
    .map(([k, v]) => `| ${k} | ${String(v)} |`)
  return ['| Field | Value |', '|-------|-------|', ...rows].join('\n')
}

export function formatRelationSection(
  key: string,
  relation: Record<string, unknown>,
  collectionPascal: string,
) {
  return [`### ${key}`, buildTable(relation)].join('\n') + `\n\nHint: Call get${collectionPascal}Field with path="${key}" for full content`
}
