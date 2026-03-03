'use client'

import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { ABAnalyticsProvider } from '@focus-reactive/payload-plugin-ab/analytics/client'
import { ThemeProvider } from './Theme'
import { Locale } from '../types'
import { analyticsAdapter } from '../lib/abTesting/analyticsAdapter'

export const Providers: React.FC<{
  locale: Locale
  messages: Record<string, string>
  children: React.ReactNode
}> = ({ children, locale, messages }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ABAnalyticsProvider adapter={analyticsAdapter}>
        <ThemeProvider>{children}</ThemeProvider>
      </ABAnalyticsProvider>
    </NextIntlClientProvider>
  )
}
