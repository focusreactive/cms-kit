import type { CollectionSlug, Field, LabelFunction, Payload, StaticLabel } from 'payload'

function resolveLabel(
  label: false | StaticLabel | LabelFunction | undefined,
  name: string,
): string {
  if (!label || typeof label === 'function') return name

  if (typeof label === 'string') return label

  const i18n = label as Record<string, string>

  return i18n['en'] ?? Object.values(i18n)[0] ?? name
}

export function buildLabelMaps(
  slug: string,
  payload: Payload,
  type: 'collection' | 'global' = 'collection',
): {
  fieldLabels: Record<string, string>
  blockLabels: Record<string, string>
  fieldRelationTo: Record<string, string>
} {
  const fields: Field[] =
    type === 'global'
      ? (payload.globals.config.find((g) => g.slug === slug)?.fields ?? [])
      : (payload.collections[slug as CollectionSlug]?.config.fields ?? [])

  const fieldLabels: Record<string, string> = {}
  const blockLabels: Record<string, string> = {}
  const fieldRelationTo: Record<string, string> = {}

  for (const field of fields) {
    if (!('name' in field)) continue

    fieldLabels[field.name] = resolveLabel(field.label, field.name)

    if (field.type === 'relationship' && typeof field.relationTo === 'string') {
      fieldRelationTo[field.name] = field.relationTo
    }

    if (field.type === 'blocks') {
      for (const block of field.blocks) {
        blockLabels[block.slug] = block.labels?.singular
          ? resolveLabel(block.labels.singular, block.slug)
          : block.slug
      }
    }
  }

  return { fieldLabels, blockLabels, fieldRelationTo }
}
