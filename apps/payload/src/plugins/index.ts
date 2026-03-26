import type { Field, Plugin } from 'payload'
import type { Page } from '@/payload-types'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { normalizeRedirectFields } from '@/hooks/normalizeRedirectFields'
import { validateRedirectPath } from '@/core/lib/redirectUrl'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { superAdmin, or, authenticated, user } from '@/core/lib/access'
import seoPlugin from './seoPlugin'
import { preventDeleteIfPresetInUse } from '@/hooks/presets/preventDeleteIfPresetInUse'
import { revalidatePagesAfterPresetChange } from '@/hooks/presets/revalidatePagesAfterPresetChange'
import { revalidatePagesAfterPresetDelete } from '@/hooks/presets/revalidatePagesAfterPresetDelete'
import { stripUnusedPresetGroups } from '@/hooks/presets/stripUnusedPresetGroups'
import { PRESET_TYPES_CONFIG } from '@/core/constants/presets'
import { presetsPlugin } from '@focus-reactive/payload-plugin-presets'
import { abTestingPlugin } from '@focus-reactive/payload-plugin-ab'
import { commentsPlugin } from '@focus-reactive/payload-plugin-comments'
import { schedulePublicationPlugin } from '@focus-reactive/payload-plugin-scheduling'
import { abAdapter } from '@/core/lib/abTesting/abAdapter'
import type { ABVariantData } from '@/core/lib/abTesting/types'
import { buildVariantData } from '@/core/lib/abTesting/buildVariantData'
import { I18N_CONFIG } from '@/core/config/i18n'
import { shouldIncludeLocalePrefix } from '@/core/lib/localePrefix'
import { isDev } from '@/core/utils/isDev'

export const plugins: Plugin[] = [
  vercelBlobStorage({
    enabled: process.env.NODE_ENV === 'production',
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
  }),
  redirectsPlugin({
    collections: ['page', 'posts'],
    redirectTypeFieldOverride: {
      label: {
        en: 'Redirect type',
        es: 'Tipo de redirección',
      },
      required: true,
      defaultValue: '307',
      admin: {
        description: {
          en: 'Choose the redirect type. 307 - temporary, 308 - permanent.',
          es: 'Elige el tipo de redirección. 307 - temporal, 308 - permanente.',
        },
      },
    },
    redirectTypes: ['307', '308'],
    overrides: {
      admin: { group: 'Settings' },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        const customFields: Field[] = [
          {
            name: 'isActive',
            type: 'checkbox',
            required: true,
            defaultValue: true,
            localized: true,
            label: {
              en: 'Active',
              es: 'Activo',
            },
            admin: {
              description: {
                en: 'Whether the redirect is active.',
                es: 'Si la redirección está activa.',
              },
            },
          },
        ]

        return defaultFields.concat(customFields).map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              unique: false,
              validate: validateRedirectPath,
              admin: {
                description: {
                  en: 'Latin letters, numbers, / - _ . ~ only. No spaces. Stored as lowercase with leading slash.',
                  es: 'Solo letras latinas, números, / - _ . ~. Sin espacios. Se guarda en minúsculas con barra inicial.',
                },
              },
            }
          }

          if ('type' in field && field.type === 'select') {
            return {
              ...field,
              localized: true,
            }
          }

          if (
            'name' in field &&
            field.name === 'to' &&
            'fields' in field &&
            Array.isArray(field.fields)
          ) {
            return {
              ...field,
              localized: true,
              fields: field.fields.map((sub: Field) =>
                'name' in sub && sub.name === 'url'
                  ? {
                      ...sub,
                      localized: true,
                      validate: (v: unknown) =>
                        validateRedirectPath(v as string, { allowUrl: true }),
                    }
                  : {
                      ...sub,
                      localized: true,
                    },
              ),
            }
          }
          return field
        })
      },
      hooks: {
        beforeChange: [normalizeRedirectFields],
        afterChange: [revalidateRedirects],
      },
      access: {
        read: or(superAdmin, user),
        create: or(superAdmin, user),
        delete: or(superAdmin, user),
        update: or(superAdmin, user),
      },
    },
  }),
  seoPlugin,

  nestedDocsPlugin({
    collections: ['page'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    generateLabel: (_, doc: unknown) => {
      return (doc as Page).title
    },
  }),

  presetsPlugin({
    debug: isDev(),
    packageName: '@focus-reactive/payload-plugin-presets',
    labels: {
      singular: { en: 'Preset', es: 'Preset' },
      plural: { en: 'Presets', es: 'Presets' },
    },
    presetTypes: [PRESET_TYPES_CONFIG.hero, PRESET_TYPES_CONFIG.testimonialsList],
    overrides: {
      admin: {
        group: 'Settings',
        defaultColumns: ['name', 'preview', 'type', 'updatedAt'],
      },
      access: {
        create: or(superAdmin, user),
        delete: or(superAdmin, user),
        read: authenticated,
        update: or(superAdmin, user),
      },
      fields: (defaultFields) => defaultFields,
      hooks: {
        beforeChange: [stripUnusedPresetGroups],
        afterChange: [revalidatePagesAfterPresetChange],
        beforeDelete: [preventDeleteIfPresetInUse],
        afterDelete: [revalidatePagesAfterPresetDelete],
      },
    },
  }),

  commentsPlugin({
    collections: [
      { slug: 'page', titleField: 'title' },
      { slug: 'posts', titleField: 'title' },
      { slug: 'categories', titleField: 'title' },
      { slug: 'authors', titleField: 'name' },
      { slug: 'testimonials', titleField: 'author' },
      { slug: 'header', titleField: 'name' },
      { slug: 'footer', titleField: 'name' },
    ],

    usernameFieldPath: 'name',
    translations: {
      es: {
        label: 'Comentarios',
        openComments_one: '{{count}} comentario abierto',
        openComments_other: '{{count}} comentarios abiertos',
        add: 'Añadir comentario',
        writeComment: 'Escribe un comentario',
        comment: 'Comentario',
        cancel: 'Cancelar',
        posting: 'Publicando…',
        resolve: 'Resolver',
        reopen: 'Reabrir',
        delete: 'Eliminar',
        general: 'General',
        close: 'Cerrar',
        syncingComments: 'Sincronizando comentarios',
        openCommentsAria: 'Abrir comentarios',
        failedToPost: 'Error al publicar el comentario',
        failedToUpdate: 'Error al actualizar el comentario',
        failedToDelete: 'Error al eliminar el comentario',
        failedToAdd: 'Error al añadir el comentario',
        unknownAuthor: 'Desconocido',
        deletedUser: 'Usuario eliminado',
        noMentionMatches: 'Sin coincidencias',
        loadingComments: 'Cargando comentarios...',
      },
    },
  }) as unknown as Plugin,

  schedulePublicationPlugin({
    collections: ['page', 'posts'],
    globals: ['site-settings'],
    secret: process.env.CRON_SECRET!,
  }) as unknown as Plugin,

  abTestingPlugin<ABVariantData>({
    debug: isDev(),
    storage: abAdapter,
    collections: {
      page: {
        generatePath: ({ doc: docProp, locale }) => {
          const doc = docProp as unknown as Page

          const breadcrumbs = doc.breadcrumbs ?? []
          const lastUrl = breadcrumbs[breadcrumbs.length - 1]?.url ?? ''
          const restPath = !lastUrl || lastUrl === '/home' ? '' : lastUrl

          const resolvedLocale = locale ?? I18N_CONFIG.defaultLocale
          return shouldIncludeLocalePrefix(resolvedLocale)
            ? `/${resolvedLocale}${restPath}`
            : restPath || '/'
        },
        generateVariantData: ({ variantDoc, locale }) => {
          return buildVariantData(
            variantDoc as unknown as Page & { _abPassPercentage?: number },
            locale,
          )
        },
      },
    },
  }),
]
