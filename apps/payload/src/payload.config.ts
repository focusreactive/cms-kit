import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Page } from '@/collections/Page/Page'
import { Posts } from '@/collections/Posts'
import { Categories } from '@/collections/Categories'
import { Authors } from '@/collections/Authors'
import { Testimonials } from '@/collections/Testimonials'
import { Tenants } from '@/collections/Tenants'
import { plugins } from '@/plugins'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { Header } from '@/collections/Header/config'
import { SiteSettings } from '@/collections/SiteSettings/config'
import { Footer } from '@/collections/Footer/config'
import { BlogPageSettings } from '@/collections/BlogPageSettings/config'
import { onInit } from '@/hooks/onInit'
import { PageVariants } from './collections/PageVariants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['/providers/BeforeOpenDrawerWrapper'],
      graphics: {
        Logo: '/shared/ui/components/Admin/Logo',
        Icon: '/shared/ui/components/Admin/Icon',
      },
      afterLogin: ['/shared/ui/components/Admin/SSOButtons'],
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Page,
    Categories,
    Authors,
    Posts,
    Testimonials,
    Tenants,
    Header,
    Footer,
    SiteSettings,
    BlogPageSettings,
    PageVariants,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
  }),
  sharp,
  plugins,
  onInit,
  globals: [],
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, es },
    translations: {
      en: {
        sso: {
          dividerLabel: 'SSO',
          signInWith: 'Sign in with {{provider}}',
        },
        beforeOpenDrawer: {
          tenantRequired: 'Please select a tenant',
        },
      },
      es: {
        sso: {
          dividerLabel: 'SSO',
          signInWith: 'Iniciar sesión con {{provider}}',
        },
        beforeOpenDrawer: {
          tenantRequired: 'Por favor seleccione un tenant',
        },
      },
    },
  },
  localization: {
    locales: I18N_CONFIG.locales,
    defaultLocale: I18N_CONFIG.defaultLocale,
    fallback: true,
  },
})
