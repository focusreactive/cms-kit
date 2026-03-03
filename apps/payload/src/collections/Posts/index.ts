import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import { slugField } from 'payload'
import { anyone, tenantAdmin, author, or, user, superAdmin } from '@/shared/lib/access'
import { createValidateSlugTenantUnique } from '@/shared/lib/validateSlugTenantUnique'
import { generatePreviewPath } from '@/shared/lib/generatePreviewPath'
import { generateSeoFields } from '@/shared/lib/seoFields'
import { BLOG_CONFIG } from '@/shared/config/blog'
import { generateRichText } from '@/shared/lib/generateRichText'
import { buildUrl } from '@/shared/lib/buildUrl'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { tenantFields } from '@/fields/tenantFields'
import { beforeChangeTenant } from '@/hooks/beforeChangeTenant'
import {
  createLocalizedDefault,
  createLocalizedRichText,
} from '@/shared/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/shared/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/shared/constants/mediaDefaults'
import { DEFAULT_VALUES } from '@/shared/constants/defaultValues'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

export const Posts: CollectionConfig<'posts'> = {
  slug: BLOG_CONFIG.collection,
  labels: {
    singular: {
      en: 'Post',
      es: 'Publicación',
    },
    plural: {
      en: 'Posts',
      es: 'Publicaciones',
    },
  },
  access: {
    create: or(superAdmin, tenantAdmin, user, author),
    delete: or(superAdmin, tenantAdmin, user, author),
    read: anyone,
    update: or(superAdmin, tenantAdmin, user, author),
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    authors: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', ...(isTenantEnabled() ? ['tenant'] : []), 'updatedAt'],
    pagination: {
      limits: [20, 50, 100],
    },
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const tenantId = data?.tenant || getDefaultTenantId()

        return generatePreviewPath({
          tenantId: tenantId,
          slug: data?.slug,
          path: buildUrl({
            collection: 'posts',
            slug: data?.slug,
            absolute: false,
            locale: getLocaleFromRequest(req),
          }),
          collection: BLOG_CONFIG.collection,
          req,
        })
      },
    },
    preview: (data, { req }) => {
      const tenantId = String(data?.tenant || getDefaultTenantId())

      return generatePreviewPath({
        tenantId: tenantId,
        slug: data?.slug as string,
        collection: BLOG_CONFIG.collection,
        path: buildUrl({
          collection: 'posts',
          slug: data?.slug as string,
          absolute: false,
          locale: getLocaleFromRequest(req),
        }),
        req,
      })
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        es: 'Título',
      },
      localized: true,
      defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.posts.title),
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: {
                en: 'Hero Image',
                es: 'Imagen de la cabecera',
              },
              defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
            },
            {
              name: 'content',
              type: 'richText',
              editor: generateRichText(),
              label: {
                en: 'Content',
                es: 'Contenido',
              },
              required: true,
              localized: true,
              defaultValue: createLocalizedRichText(DEFAULT_VALUES.richText.content),
            },
          ],
          label: {
            en: 'Content',
            es: 'Contenido',
          },
        },
        {
          fields: [
            {
              name: 'relatedPostsIntro',
              type: 'text',
              required: true,
              defaultValue: createLocalizedDefault(
                DEFAULT_VALUES.collections.posts.relatedPostsIntro,
              ),
              admin: {
                description: {
                  en: 'Provide a short introduction for the related posts section',
                  es: 'Proporciona una introducción corta para la sección de publicaciones relacionadas',
                },
              },
              label: {
                en: 'Related Posts',
                es: 'Publicaciones relacionadas',
              },
              localized: true,
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: BLOG_CONFIG.collection,
              label: {
                en: 'Related Posts',
                es: 'Publicaciones relacionadas',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
              label: {
                en: 'Categories',
                es: 'Categorías',
              },
            },
          ],
          label: {
            en: 'Meta',
            es: 'Meta',
          },
        },
        {
          name: 'meta',
          label: {
            en: 'SEO',
            es: 'SEO',
          },
          fields: generateSeoFields(),
          localized: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      index: true,
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
      label: {
        en: 'Published At',
        es: 'Publicado el',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'authors',
      label: {
        en: 'Authors',
        es: 'Autores',
      },
    },
    slugField({
      useAsSlug: 'title',
      required: false,
      overrides: (field) => {
        const slugSub = field.fields?.[1] as { unique?: boolean } | undefined
        if (slugSub && 'unique' in slugSub) slugSub.unique = false
        return field
      },
    }),
    ...tenantFields({ collection: 'posts' }),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    beforeChange: [beforeChangeTenant, createValidateSlugTenantUnique('posts')],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
