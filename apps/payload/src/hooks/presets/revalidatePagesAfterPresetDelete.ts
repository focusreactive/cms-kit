import type { CollectionAfterDeleteHook } from 'payload'

export const revalidatePagesAfterPresetDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  return doc
}
