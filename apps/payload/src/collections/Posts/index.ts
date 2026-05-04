import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { indexPostEmbedding, deletePostEmbedding } from './hooks/indexEmbedding'

import { createSharedSlugField } from '@/fields/slugField'
import { anyone, author, or, user, superAdmin } from '@/core/lib/access'
import { generatePreviewPath } from '@/core/lib/generatePreviewPath'
import { generateSeoFields } from '@/core/lib/seoFields'
import { BLOG_CONFIG } from '@/core/config/blog'
import { generateRichText } from '@/core/lib/generateRichText'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { createLocalizedDefault, createLocalizedRichText } from '@/core/lib/createLocalizedDefault'
import { getDefaultMediaId } from '@/core/lib/getDefaultMediaId'
import { PLATFORM_DEFAULT_MEDIA_SLOT } from '@/core/constants/mediaDefaults'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'

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
    create: or(superAdmin, user, author),
    delete: or(superAdmin, user, author),
    read: anyone,
    update: or(superAdmin, user, author),
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    authors: true,
    excerpt: true,
    heroImage: true,
    publishedAt: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    pagination: {
      limits: [20, 50, 100],
    },
    group: 'Blog',
    livePreview: {
      url: ({ data, locale: localeProp }) => {
        const locale = localeProp.code ?? localeProp.fallbackLocale

        return generatePreviewPath({
          slug: data?.slug,
          path: buildUrl({
            collection: 'posts',
            slug: data?.slug,
            absolute: false,
            locale,
          }),
          collection: BLOG_CONFIG.collection,
        })
      },
    },
    preview: (data, { locale }) => {
      return generatePreviewPath({
        slug: data?.slug as string,
        collection: BLOG_CONFIG.collection,
        path: buildUrl({
          collection: 'posts',
          slug: data?.slug as string,
          absolute: false,
          locale,
        }),
      })
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
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
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: {
                en: 'Excerpt',
                es: 'Extracto',
              },
              localized: true,
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.posts.excerpt),
            },
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
    createSharedSlugField('posts'),
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
      name: 'categories',
      type: 'relationship',
      required: true,
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
    {
      name: 'authors',
      type: 'relationship',
      required: true,
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
    {
      name: 'relatedPosts',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        description: {
          en: 'Select up to 3 related posts. If fewer than 3 are selected, additional posts from the same categories will be shown automatically based on publish date.',
          es: 'Selecciona hasta 3 publicaciones relacionadas. Si se seleccionan menos de 3, se mostrarán automáticamente publicaciones adicionales de las mismas categorías según la fecha de publicación.',
        },
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
  ],
  hooks: {
    afterChange: [revalidatePost, indexPostEmbedding],
    afterDelete: [revalidateDelete, deletePostEmbedding],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
