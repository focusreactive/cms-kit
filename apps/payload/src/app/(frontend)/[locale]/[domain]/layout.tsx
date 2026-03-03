import React from 'react'
import { Providers } from '@/shared/context'
import { Viewport } from 'next'
import { Locale } from '@/shared/types'
import { getMessages } from 'next-intl/server'
import { InitTheme } from '@/shared/context/Theme/InitTheme'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/features'
import { getSiteSettings } from '@/shared/lib/getSiteSettings'
import { GoogleAnalyticsScript } from '@/shared/lib/analytics/GoogleAnalyticsScript'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale; domain: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale, domain } = await params
  const { isEnabled: draft } = await draftMode()
  const messages = await getMessages()
  const siteSettings = await getSiteSettings({ domain })

  return (
    <html lang={locale}>
      <head>
        <InitTheme />
      </head>
      <body>
        {siteSettings?.theme?.config && (
          <style
            dangerouslySetInnerHTML={{ __html: siteSettings.theme.config }}
            suppressHydrationWarning
          />
        )}

        <Providers locale={locale as Locale} messages={messages}>
          {children}
          {draft && <LivePreviewListener />}
        </Providers>

        <GoogleAnalyticsScript measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
