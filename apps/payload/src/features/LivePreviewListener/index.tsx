'use client'

import { getClientSideURL } from '@/core/lib/getURL'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isInIframe, setIsInIframe] = useState(false)
  const [isFromPayloadAdmin, setIsFromPayloadAdmin] = useState(false)
  const t = useTranslations('common')

  useEffect(() => {
    const checkIframe = () => {
      try {
        const inIframe = window.self !== window.top
        setIsInIframe(inIframe)

        if (inIframe) {
          let isAdmin = false

          try {
            const parentLocation = window.parent.location
            const parentPath = parentLocation.pathname || ''
            isAdmin = parentPath.includes('/admin')
          } catch (_) {
            const referrer = document.referrer || ''
            isAdmin =
              referrer.includes('/admin') ||
              referrer.includes('payload') ||
              window.location.search.includes('preview=true')
          }

          setIsFromPayloadAdmin(isAdmin)
        }
      } catch (_) {
        setIsInIframe(false)
        setIsFromPayloadAdmin(false)
      }
    }

    checkIframe()
  }, [])

  const exitPreviewUrl = `/next/exit-preview?path=${encodeURIComponent(pathname)}`

  return (
    <>
      <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
      {(!isInIframe || !isFromPayloadAdmin) && (
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href={exitPreviewUrl}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg transition-colors"
          >
            {t('exitPreview')}
          </a>
        </div>
      )}
    </>
  )
}
