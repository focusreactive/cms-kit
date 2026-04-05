import { Page } from '@/payload-types'

export function getPathFromBreadcrumbs(breadcrumbs?: Page['breadcrumbs']): string | undefined {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) {
    return undefined
  }

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  if (!lastBreadcrumb?.url) {
    return undefined
  }

  return lastBreadcrumb.url.replace(/^\//, '')
}
