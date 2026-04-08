import { CollectionSlug, Field, Payload } from 'payload'

export function findCollectionField(
  payload: Payload,
  collection: CollectionSlug,
  fieldName: string,
) {
  const fields: Field[] = payload.collections[collection]?.config.fields ?? []

  return fields.find((field) => 'name' in field && field.name === fieldName)
}
