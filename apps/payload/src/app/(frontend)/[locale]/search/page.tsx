import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { Footer, Header } from '@/widgets'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'
import { SearchClient } from './_components/SearchClient'
import { Locale } from '@/core/types'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function SearchPage({ params }: Args) {
  const { locale } = await params
  const siteSettings = await getSiteSettings({ locale })

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <SearchClient locale={locale} />
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'search' })

  return {
    title: t('pageTitle'),
  }
}
