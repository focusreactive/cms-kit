import type { CollectionBeforeChangeHook } from 'payload'
import { normalizeRedirectPath, normalizeRedirectToUrl } from '@/core/lib/redirectUrl'

export const normalizeRedirectFields: CollectionBeforeChangeHook = ({ data, req }) => {
  req?.payload.logger?.info?.(`Normalizing redirect fields: ${data.from}`)

  if (data?.from && typeof data.from === 'string') {
    data.from = normalizeRedirectPath(data.from)
  }
  if (data?.to?.type === 'custom' && data.to?.url && typeof data.to.url === 'string') {
    data.to.url = normalizeRedirectToUrl(data.to.url)
  }
  return data
}
