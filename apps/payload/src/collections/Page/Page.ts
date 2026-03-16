import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { validateReservedSlug, validateReservedPath } from './hooks/validateReservedSlug'
import { generatePreviewPath } from '@/shared/lib/generatePreviewPath'
import { tenantAdmin, anyone, author, or, superAdmin, user } from '@/shared/lib/access'
import { createParentField, createBreadcrumbsField } from '@payloadcms/plugin-nested-docs'
import { buildUrl } from '@/shared/lib/buildUrl'
import type { Page as PageType } from '@/payload-types'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { createLocalizedDefault } from '@/shared/lib/createLocalizedDefault'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'
import { createBasePageFields } from './basePageFields'

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
    create: or(superAdmin, tenantAdmin, user, author),
    update: or(superAdmin, tenantAdmin, user, author),
    delete: or(superAdmin, tenantAdmin, user, author),
  },
  folders: true,
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: data?.slug,
          path: buildUrl({
            collection: 'page',
            breadcrumbs: data?.breadcrumbs,
            absolute: false,
            locale: getLocaleFromRequest(req),
          }),
          collection: 'page',
        })
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: data?.slug as string,
        path: buildUrl({
          collection: 'page',
          breadcrumbs: data?.breadcrumbs as PageType['breadcrumbs'],
          absolute: false,
          locale: getLocaleFromRequest(req),
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
    slugField({
      useAsSlug: 'title',
      required: false,
      overrides: (field) => {
        const slugSub = field.fields?.[1] as { unique?: boolean } | undefined
        if (slugSub && 'unique' in slugSub) slugSub.unique = false
        return field
      },
    }),
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
    beforeChange: [validateReservedSlug, validateReservedPath],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    maxPerDoc: 50,
    drafts: true,
  },
}
