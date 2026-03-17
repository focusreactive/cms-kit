import React from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { Section, Container, buttonVariants, ButtonVariant, Link } from '@/shared/ui'
import { generateNotFoundMeta } from '@/shared/lib/generateNotFoundMeta'
import { Locale } from '@/shared/types'
import { resolveLocale } from '@/shared/lib/resolveLocale'
import { Footer, Header } from '@/widgets'
import { Header as HeaderType, Footer as FooterType } from '@/payload-types'
import { headers } from 'next/headers'

type Props = {
  params?: Promise<{ locale: Locale }>
}

export default async function NotFound() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0] as Locale

  const [settings, t] = await Promise.all([
    getSiteSettings({ locale }),
    getTranslations({ locale, namespace: 'common' }),
  ])

  return (
    <>
      <Header data={settings.header as HeaderType} />
      <main>
        <Section className="flex items-center justify-center min-h-[60vh]">
          <Container className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {settings.notFoundTitle || '404 - Page not found'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {settings.notFoundDescription ||
                'Unfortunately, the requested page does not exist or has been deleted.'}
            </p>
            <Link
              href="/"
              locale={locale}
              className={buttonVariants({ variant: ButtonVariant.Primary })}
            >
              {t('goToHomepage')}
            </Link>
          </Container>
        </Section>
      </main>
      <Footer data={settings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = params ? await params : undefined
  const locale = await resolveLocale(resolvedParams?.locale)
  return generateNotFoundMeta({ locale })
}
