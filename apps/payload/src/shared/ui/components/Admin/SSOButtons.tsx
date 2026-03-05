'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, useTranslation } from '@payloadcms/ui'
import { Loader2 } from 'lucide-react'

const spinKeyframes = `
@keyframes sso-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`

const ssoProviderName =
  typeof process.env.NEXT_PUBLIC_OIDC_PROVIDER_NAME === 'string' &&
  process.env.NEXT_PUBLIC_OIDC_PROVIDER_NAME.length > 0
    ? process.env.NEXT_PUBLIC_OIDC_PROVIDER_NAME
    : 'SSO'

export default function SSOButtons() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSSOClick = () => {
    setLoading(true)
    const url = new URL(window.location.href)
    url.searchParams.delete('error')
    router.replace(url.pathname + url.search)
    window.location.href = '/api/auth/oidc'
  }

  return (
    <div style={{ marginTop: 12 }}>
      {error ? (
        <div
          role="alert"
          style={{
            marginBottom: 12,
            padding: '8px 12px',
            background: 'var(--theme-error-500)',
            color: 'var(--theme-elevation-0)',
            borderRadius: 'var(--border-radius-m)',
            fontSize: 13,
          }}
        >
          {decodeURIComponent(error)}
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'var(--theme-elevation-150)' }} />
        <div style={{ color: 'var(--theme-text)', opacity: 0.7, fontSize: 12 }}>
          {t('sso:dividerLabel' as never)}
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--theme-elevation-150)' }} />
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button
          size="large"
          buttonStyle="secondary"
          iconStyle="without-border"
          disabled={loading}
          extraButtonProps={{ style: { width: '100%' } }}
          onClick={handleSSOClick}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              height: '100%',
            }}
          >
            {loading ? (
              <>
                <Loader2
                  aria-hidden
                  style={{
                    width: 16,
                    height: 16,
                    animation: 'sso-spin 1s linear infinite',
                  }}
                />
                <style>{spinKeyframes}</style>
              </>
            ) : null}
            <span>
              {loading ? t('general:loading') : t('sso:signInWith' as never, { provider: ssoProviderName })}
            </span>
          </span>
        </Button>
      </div>
    </div>
  )
}
