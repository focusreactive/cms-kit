'use client'

import Script from 'next/script'

interface Props {
  measurementId?: string
}

export function GoogleAnalyticsScript({ measurementId }: Props) {
  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        id="gtag-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              send_page_view: false
            });
          `,
        }}
      />
    </>
  )
}
