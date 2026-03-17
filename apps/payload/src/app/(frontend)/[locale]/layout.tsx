import React from 'react'
import { Providers } from '@/shared/context'
import { Viewport } from 'next'
import { Locale } from '@/shared/types'
import { getMessages } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/features'
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
  params: Promise<{ locale: Locale }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const { isEnabled: draft } = await draftMode()
  const messages = await getMessages()

  return (
    <html lang={locale} className="light">
      <head />
      <body>
        <Providers locale={locale as Locale} messages={messages}>
          {children}
          {draft && <LivePreviewListener />}
        </Providers>
        <GoogleAnalyticsScript measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
