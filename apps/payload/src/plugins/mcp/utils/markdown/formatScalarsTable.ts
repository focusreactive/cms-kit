export function formatScalarsTable(fields: Record<string, unknown>) {
  const entries = Object.entries(fields)
  if (entries.length === 0) return ''

  const rows = entries.map(([k, v]) => `| ${k} | ${String(v)} |`)
  return ['## Fields', '| Field | Value |', '|-------|-------|', ...rows].join('\n')
}
