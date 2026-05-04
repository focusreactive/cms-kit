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
import { DocumentEmbeddings } from '@/collections/DocumentEmbeddings'
import { plugins } from '@/plugins'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { I18N_CONFIG } from '@/core/config/i18n'
import { Header } from '@/collections/Header/config'
import { Footer } from '@/collections/Footer/config'
import { SiteSettings } from '@/globals/SiteSettings/config'

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
        Logo: '/core/ui/components/Admin/Logo',
        Icon: '/core/ui/components/Admin/Icon',
      },
      afterLogin: ['/core/ui/components/Admin/SSOButtons'],
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
  collections: [Users, Media, Page, Categories, Authors, Posts, Testimonials, Header, Footer, DocumentEmbeddings],
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
  globals: [SiteSettings],
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, es },
    translations: {
      en: {
        sso: {
          dividerLabel: 'SSO',
          signInWith: 'Sign in with {{provider}}',
        },
      },
      es: {
        sso: {
          dividerLabel: 'SSO',
          signInWith: 'Iniciar sesión con {{provider}}',
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
