import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePagesAfterPresetChange: CollectionAfterChangeHook = async ({ doc }) => {
  return doc
}
