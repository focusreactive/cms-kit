interface ResolvePathProps {
  breadcrumbsPath?: string | null
  slug?: string | null
  basePath?: string
  page?: number
  homeSlug?: string
}

export function resolvePath({
  breadcrumbsPath,
  slug,
  basePath,
  page,
  homeSlug = 'home',
}: ResolvePathProps) {
  if (basePath !== undefined) {
    if (page !== undefined && page > 1) {
      return `${basePath}?page=${page}`
    }

    if (slug) {
      return `${basePath}/${slug}`
    }

    return basePath
  }

  const finalSlug = breadcrumbsPath ?? slug
  if (!finalSlug || finalSlug === homeSlug) {
    return ''
  }

  return `/${finalSlug}`
}
