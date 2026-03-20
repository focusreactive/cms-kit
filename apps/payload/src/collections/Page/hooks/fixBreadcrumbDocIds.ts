import type { CollectionBeforeChangeHook } from 'payload'
import type { Page } from '@/payload-types'

export const fixBreadcrumbDocIds: CollectionBeforeChangeHook<Page> = ({ data }) => {
  if (Array.isArray(data?.breadcrumbs)) {
    data.breadcrumbs = data.breadcrumbs.map((crumb) => ({
      ...crumb,
      doc: typeof crumb.doc === 'string' ? Number(crumb.doc) : crumb.doc,
    }))
  }

  return data
}
