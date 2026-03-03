import { Media } from '@/payload-types'
import { extractTenantId } from '@/shared/lib/extractTenantId'
import { APIError, type CollectionBeforeChangeHook, type Where } from 'payload'
import { isTenantEnabled } from '@/shared/config/tenant'

const PLATFORM_DEFAULT = 'platform_default'

export const ensureSingleDefaultMediaPerTenant: CollectionBeforeChangeHook<Media> = async ({
  data,
  originalDoc,
  req,
  operation,
}) => {
  const defaultFor = data?.defaultFor
  if (!Array.isArray(defaultFor) || !defaultFor.includes(PLATFORM_DEFAULT)) {
    return data
  }

  let where: Where

  if (!isTenantEnabled()) {
    where = {
      defaultFor: { contains: PLATFORM_DEFAULT },
      ...(operation === 'update' && originalDoc?.id && { id: { not_equals: originalDoc.id } }),
    }
  } else {
    const tenantId = extractTenantId(data?.tenant)
    if (!tenantId) {
      return data
    }

    where = {
      tenant: { equals: tenantId },
      defaultFor: { contains: PLATFORM_DEFAULT },
      ...(operation === 'update' && originalDoc?.id && { id: { not_equals: originalDoc.id } }),
    }
  }

  const { docs } = await req.payload.find({
    collection: 'media',
    where,
    limit: 1,
    depth: 0,
    req,
  })

  if (docs.length > 0) {
    const errorMessage = isTenantEnabled()
      ? 'Only one default media (platform_default) is allowed per tenant.'
      : 'Only one default media (platform_default) is allowed in single-tenant mode.'

    throw new APIError(errorMessage, 400, undefined, true)
  }

  req.payload?.logger?.info?.('Default media validation passed.')

  return data
}
