import type { Page } from '@/payload-types'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { getServerSideURL } from '@/core/lib/getURL'
import type { BreadcrumbItem, Locale } from '@/core/types'

export type CreateBreadcrumbsOptions = (
  | {
      items: Page['breadcrumbs']
    }
  | {
      blog: {
        title: string
        page?: number
        post?: {
          title: string
          slug: string
        }
      }
    }
) & {
  locale: Locale
}

export async function createBreadcrumbsSchema(options: CreateBreadcrumbsOptions) {
  const baseUrl = getServerSideURL()
  const settings = await getSiteSettings({ locale: options.locale })

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: settings?.siteName || 'Home',
      url: buildUrl({
        collection: 'page',
        locale: options.locale,
        slug: 'home',
      }),
    },
  ]

  if ('items' in options && Array.isArray(options.items)) {
    for (const item of options.items) {
      if (item?.label && item?.url) {
        const url = item.url.startsWith('http')
          ? item.url
          : item.url.startsWith('/')
            ? `${baseUrl}${item.url}`
            : `${baseUrl}/${item.url}`

        breadcrumbs.push({ name: item.label, url })
      }
    }
  }

  if ('blog' in options) {
    const { blog } = options
    breadcrumbs.push({
      name: blog.title,
      url: buildUrl({
        collection: 'posts',
        locale: options.locale,
      }),
    })

    if (blog.post) {
      breadcrumbs.push({
        name: blog.post.title,
        url: buildUrl({
          collection: 'posts',
          slug: blog.post.slug,
          locale: options.locale,
        }),
      })
    }

    if (blog.page && blog.page > 1) {
      breadcrumbs.push({
        name: `Page ${blog.page}`,
        url: buildUrl({
          collection: 'posts',
          page: blog.page,
          locale: options.locale,
        }),
      })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
