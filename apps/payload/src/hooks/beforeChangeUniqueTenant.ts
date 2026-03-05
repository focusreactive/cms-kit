import { extractTenantId } from '@/shared/lib/extractTenantId'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { Locale } from '@/shared/types'
import { APIError, CollectionBeforeChangeHook } from 'payload'
import { getDefaultTenantId, isTenantEnabled } from '@/shared/config/tenant'

export const beforeChangeUniqueTenant: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
  collection,
}) => {
  if (originalDoc?.id) {
    return data
  }

  const locale = getLocaleFromRequest(req)
  const collectionName =
    typeof collection.labels?.singular === 'object'
      ? collection.labels.singular[locale as Locale]
      : typeof collection.labels?.singular === 'string'
        ? collection.labels.singular
        : collection.slug

  // In single-tenant mode, check global uniqueness (only one record allowed)
  if (!isTenantEnabled()) {
    const existingDoc = await req.payload.find({
      collection: collection.slug,
      where: {
        tenant: {
          equals: getDefaultTenantId(),
        },
      },
      limit: 1,
    })

    if (existingDoc.docs.length > 0) {
      throw new APIError(
        `A ${collectionName} already exists. Only one ${collectionName} is allowed in single-tenant mode.`,
        400,
        undefined,
        true,
      )
    }
    return data
  }

  // Multi-tenant mode: check uniqueness per tenant
  const tenantId = extractTenantId(data.tenant)

  if (!tenantId) {
    return data
  }

  const existingDoc = await req.payload.find({
    collection: collection.slug,
    where: {
      tenant: {
        equals: tenantId,
      },
    },
    limit: 1,
  })

  if (existingDoc.docs.length > 0) {
    throw new APIError(
      `A ${collectionName} for this tenant already exists. Only one ${collectionName} per tenant is allowed.`,
      400,
      undefined,
      true,
    )
  }

  return data
}
