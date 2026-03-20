import type { CollectionConfig } from 'payload'
import { createSharedSlugField } from '@/fields/slugField'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { validateReservedSlug, validateReservedPath } from './hooks/validateReservedSlug'
import { fixBreadcrumbDocIds } from './hooks/fixBreadcrumbDocIds'
import { generatePreviewPath } from '@/core/lib/generatePreviewPath'
import { anyone, author, or, superAdmin, user } from '@/core/lib/access'
import { createParentField, createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import { buildUrl } from '@/core/lib/buildUrl'
import type { Page as PageType } from '@/payload-types'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'
import { createBasePageFields } from './basePageFields'
import { createLocalizedDefault } from '@/core/lib/createLocalizedDefault'

export const Page: CollectionConfig<'page'> = {
  slug: 'page',
  labels: {
    singular: {
      en: 'Page',
      es: 'Página',
    },
    plural: {
      en: 'Pages',
      es: 'Páginas',
    },
  },
  access: {
    read: anyone,
    create: or(superAdmin, user, author),
    update: or(superAdmin, user, author),
    delete: or(superAdmin, user, author),
  },
  folders: true,
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content',
    livePreview: {
      url: ({ data, locale }) => {
        return generatePreviewPath({
          slug: data?.slug,
          path: buildUrl({
            collection: 'page',
            breadcrumbs: data?.breadcrumbs,
            absolute: false,
            locale: locale.code ?? locale.fallbackLocale,
          }),
          collection: 'page',
        })
      },
    },
    preview: (data, { locale }) => {
      return generatePreviewPath({
        slug: data?.slug as string,
        path: buildUrl({
          collection: 'page',
          breadcrumbs: data?.breadcrumbs as PageType['breadcrumbs'],
          absolute: false,
          locale,
        }),
        collection: 'page',
      })
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.page.title),
      admin: {
        description: {
          en: 'The title of the page',
          es: 'El título de la página (por defecto: "Page")',
        },
      },
    },
    ...createBasePageFields({ withBlocksDefaultValue: true }),
    createSharedSlugField('page'),
    createParentField('page', {
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id }) => {
        return {
          slug: {
            not_equals: 'home',
          },
          id: {
            not_equals: id,
          },
        }
      },
    }),
    createBreadcrumbsField('page', {
      label: {
        en: 'Page Breadcrumbs',
        es: 'Breadcrumbs de la página',
      },
      admin: {
        position: 'sidebar',
      },
    }),
  ],
  hooks: {
    beforeChange: [fixBreadcrumbDocIds, validateReservedSlug, validateReservedPath],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    maxPerDoc: 50,
    drafts: true,
  },
}
