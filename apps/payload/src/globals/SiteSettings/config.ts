import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'
import { anyone, or, user, superAdmin } from '@/core/lib/access'
import { createLocalizedDefault } from '@/core/lib/createLocalizedDefault'
import { DEFAULT_VALUES } from '@/core/constants/defaultValues'
import { generateSeoFields } from '@/core/lib/seoFields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site Settings',
    es: 'Configuración del sitio',
  },
  access: {
    read: anyone,
    update: or(superAdmin, user),
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'General',
            es: 'General',
          },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.siteName),
              admin: {
                description: {
                  en: 'The name of your website',
                  es: 'El nombre de tu sitio web',
                },
              },
              localized: true,
            },
            {
              name: 'header',
              type: 'relationship',
              relationTo: 'header',
              admin: {
                description: {
                  en: 'The header to display on the blog page',
                  es: 'El header a mostrar en la página de blog',
                },
              },
            },
            {
              name: 'footer',
              type: 'relationship',
              relationTo: 'footer',
              admin: {
                description: {
                  en: 'The footer to display on the blog page',
                  es: 'El footer a mostrar en la página de blog',
                },
              },
            },
          ],
        },
        {
          label: {
            en: 'Admin Panel',
            es: 'Panel de administración',
          },
          fields: [
            {
              name: 'adminLogo',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Admin Panel Logo',
                es: 'Logo del panel de administración',
              },
              admin: {
                description: {
                  en: 'Logo displayed in the admin panel sidebar (recommended: SVG or PNG, ~150x40px)',
                  es: 'Logo mostrado en la barra lateral del panel de administración (recomendado: SVG o PNG, ~150x40px)',
                },
              },
            },
            {
              name: 'adminIcon',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Admin Panel Icon',
                es: 'Icono del panel de administración',
              },
              admin: {
                description: {
                  en: 'Icon displayed when sidebar is collapsed (recommended: SVG or PNG, 32x32px)',
                  es: 'Icono mostrado cuando la barra lateral está colapsada (recomendado: SVG o PNG, 32x32px)',
                },
              },
            },
          ],
        },
        {
          label: {
            en: 'SEO Defaults',
            es: 'Valores por defecto de SEO',
          },
          fields: [
            {
              name: 'seoTitleSeparator',
              type: 'select',
              label: {
                en: 'Title Separator',
                es: 'Separador de título',
              },
              defaultValue: '|',
              options: [
                { label: { en: '| (pipe)', es: '| (pipe)' }, value: '|' },
                { label: { en: '- (dash)', es: '- (dash)' }, value: '-' },
                { label: { en: '• (bullet)', es: '• (bullet)' }, value: '•' },
              ],
              admin: {
                description: {
                  en: 'Character used to separate page title from site name',
                  es: 'Carácter usado para separar el título de la página del nombre del sitio',
                },
              },
            },
            {
              name: 'seoTitleSuffix',
              type: 'text',
              label: {
                en: 'Title Suffix',
                es: 'Sufijo de título',
              },
              admin: {
                description: {
                  en: 'Text added after separator (defaults to Site Name if empty)',
                  es: 'Texto agregado después del separador (por defecto el nombre del sitio si está vacío)',
                },
                placeholder: {
                  en: 'Leave empty to use Site Name',
                  es: 'Dejar vacío para usar el nombre del sitio',
                },
              },
              localized: true,
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.seoTitleSuffix),
            },
            {
              name: 'defaultOgTitle',
              type: 'text',
              label: {
                en: 'Default OG Title',
                es: 'Título de respaldo de Open Graph',
              },
              admin: {
                description: {
                  en: 'Fallback title for Open Graph when page has no title',
                  es: 'Título de respaldo para Open Graph cuando la página no tiene título',
                },
              },
              localized: true,
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: {
                en: 'Default Meta Description',
                es: 'Descripción de meta de respaldo',
              },
              admin: {
                description: {
                  en: 'Fallback description when page has no description',
                  es: 'Descripción de respaldo cuando la página no tiene descripción',
                },
              },
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.defaultDescription),
              localized: true,
            },
            {
              name: 'defaultOgDescription',
              type: 'textarea',
              label: {
                en: 'Default OG Description',
                es: 'Descripción de respaldo de Open Graph',
              },
              admin: {
                description: {
                  en: 'Fallback description for Open Graph (uses Meta Description if empty)',
                  es: 'Descripción de respaldo para Open Graph (usa la descripción meta si está vacía)',
                },
              },
              localized: true,
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.defaultOgDescription),
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Default OG Image',
                es: 'Imagen de respaldo de Open Graph',
              },
              admin: {
                description: {
                  en: 'Fallback image for social media sharing',
                  es: 'Imagen de respaldo para compartir en redes sociales',
                },
              },
            },
            {
              name: 'ogSiteName',
              type: 'text',
              label: {
                en: 'OG Site Name',
                es: 'Nombre del sitio de Open Graph',
              },
              admin: {
                description: {
                  en: 'Site name for Open Graph. Defaults to Site Name if empty',
                  es: 'Nombre del sitio para Open Graph. Por defecto el nombre del sitio si está vacío',
                },
                placeholder: {
                  en: 'Leave empty to use Site Name',
                  es: 'Dejar vacío para usar el nombre del sitio',
                },
              },
              localized: true,
            },
            {
              name: 'twitterSite',
              type: 'text',
              label: {
                en: 'Twitter Site Handle',
                es: 'Handle de Twitter',
              },
              admin: {
                description: {
                  en: 'Twitter/X username for the website (e.g., @yoursite)',
                  es: 'Nombre de usuario de Twitter/X para el sitio web (ej., @yoursite)',
                },
                placeholder: {
                  en: '@yoursite',
                  es: '@yoursite',
                },
              },
              localized: true,
            },
            {
              name: 'twitterCreator',
              type: 'text',
              label: {
                en: 'Default Twitter Creator Handle',
                es: 'Handle de Twitter de respaldo',
              },
              admin: {
                description: {
                  en: 'Default Twitter/X username for content creator (e.g., @author)',
                  es: 'Nombre de usuario de Twitter/X de respaldo para el creador de contenido (ej., @author)',
                },
                placeholder: {
                  en: '@author',
                  es: '@author',
                },
              },
              localized: true,
            },
            {
              name: 'defaultTwitterCard',
              type: 'select',
              label: {
                en: 'Default Twitter Card Type',
                es: 'Tipo de tarjeta de Twitter de respaldo',
              },
              defaultValue: 'summary_large_image',
              options: [
                { label: { en: 'Summary Card with Large Image', es: 'Tarjeta de resumen con imagen grande' }, value: 'summary_large_image' },
                { label: { en: 'Summary Card', es: 'Tarjeta de resumen' }, value: 'summary' },
              ],
              admin: {
                description: {
                  en: 'Type of Twitter Card to display',
                  es: 'Tipo de tarjeta de Twitter a mostrar',
                },
              },
            },
          ],
        },
        {
          label: {
            en: '404 Page',
            es: 'Página 404',
          },
          fields: [
            {
              name: 'notFoundTitle',
              type: 'text',
              label: {
                en: '404 Title',
                es: 'Título de la página 404',
              },
              admin: {
                description: {
                  en: 'Heading displayed on 404 page',
                  es: 'Encabezado mostrado en la página 404',
                },
              },
              localized: true,
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.notFoundTitle),
            },
            {
              name: 'notFoundDescription',
              type: 'textarea',
              label: {
                en: '404 Description',
                es: 'Descripción de la página 404',
              },
              defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.notFoundDescription),
              admin: {
                description: {
                  en: 'Text displayed on 404 page',
                  es: 'Texto mostrado en la página 404',
                },
              },
              localized: true,
            },
          ],
        },
        {
          name: 'blog',
          label: {
            en: 'Blog',
            es: 'Blog',
          },
          fields: [
            {
              name: 'labels',
              type: 'group',
              label: { en: 'Labels', es: 'Etiquetas' },
              fields: [
                {
                  name: 'readMoreLabel',
                  type: 'text',
                  required: true,
                  label: { en: 'Read More Button Label', es: 'Etiqueta del botón Leer más' },
                  localized: true,
                  defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.blog.readMoreLabel),
                },
                {
                  name: 'relatedPostsLabel',
                  type: 'text',
                  required: true,
                  label: { en: 'Related Posts Label', es: 'Etiqueta de publicaciones relacionadas' },
                  localized: true,
                  defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.blog.relatedPostsLabel),
                },
              ],
            },
            {
              name: 'blogMeta',
              type: 'group',
              label: { en: 'Blog SEO', es: 'SEO del blog' },
              fields: generateSeoFields(),
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  versions: {
    drafts: true,
  },
}
