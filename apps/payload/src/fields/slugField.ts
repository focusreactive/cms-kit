import { slugField as payloadSlugField } from 'payload'
import type { PayloadRequest } from 'payload'

/**
 * Shared slug field for Pages and Posts.
 * - required: true
 * - unique within the collection (DB constraint)
 * - validated to be unique across both collections
 */
export const createSharedSlugField = (currentCollection: 'page' | 'posts') => {
  const otherCollection = currentCollection === 'page' ? 'posts' : 'page'
  const otherLabel = otherCollection === 'page' ? 'a page' : 'a post'

  return payloadSlugField({
    useAsSlug: 'title',
    required: true,
    overrides: (field) => {
      const slugInput = field.fields?.[1] as
        | { unique?: boolean; validate?: unknown }
        | undefined

      if (slugInput) {
        slugInput.unique = true
        slugInput.validate = async (
          value: string | null | undefined,
          { req }: { req: PayloadRequest },
        ): Promise<string | true> => {
          if (!value || !req?.payload) return true

          const result = await req.payload.find({
            collection: otherCollection,
            where: { slug: { equals: value } },
            limit: 1,
            overrideAccess: true,
          })

          return result.totalDocs === 0 ? true : `This slug is already used by ${otherLabel}`
        }
      }

      return field
    },
  })
}
