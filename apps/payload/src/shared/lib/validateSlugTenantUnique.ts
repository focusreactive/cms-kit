import { Page, Post } from '@/payload-types'
import { type CollectionBeforeChangeHook } from 'payload'
import type { CollectionSlug, TypeWithID } from 'payload'
import { slugify } from 'payload/shared'
import { isTenantEnabled } from '@/shared/config/tenant'
import { Where } from 'payload'

type DocWithSlugTenant = TypeWithID & {
  slug?: string | null
  tenant?: number | { id: number } | null
} & Pick<Post | Page, 'title'>

export function createValidateSlugTenantUnique(
  collection: CollectionSlug,
  options: {
    titleField: string
  } = {
    titleField: 'title',
  },
): CollectionBeforeChangeHook<DocWithSlugTenant> {
  return async ({ data, req, originalDoc }) => {
    req.payload?.logger?.info?.(
      `Validating slug tenant unique for ${collection}, data.id=${data?.id}, originalDoc.id=${originalDoc?.id}`,
    )

    if (!data || !data.tenant) return data

    const usingSlugField = 'slug' in data

    if (usingSlugField) {
      if (!data?.slug) {
        data.slug = slugify(`${data[options.titleField as keyof DocWithSlugTenant]}`)
      }
    }

    const tenantId = typeof data.tenant === 'object' ? data.tenant.id : data.tenant

    const excludeId = originalDoc && 'id' in originalDoc ? originalDoc.id : undefined

    const andConditions: Where[] = []

    if (usingSlugField) {
      andConditions.push({ slug: { equals: data.slug } })
    }

    if (isTenantEnabled()) {
      andConditions.push({ tenant: { equals: tenantId } })
    }

    if (excludeId) {
      andConditions.push({ id: { not_equals: excludeId } })
    }

    const existing = await req.payload.find({
      collection,
      where: {
        and: andConditions,
      },
      limit: 1,
      depth: 0,
      req,
    })

    if (existing.docs.length > 0) {
      if (usingSlugField) {
        data.slug = slugify(`${data.slug} ${Date.now()}`)
      }
    }

    return data
  }
}
