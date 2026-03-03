'use client'

import React from 'react'
import { toast, useTranslation } from '@payloadcms/ui'
import { BeforeOpenDrawerProvider } from '@/plugins/presetsPlugin/components/blocksDrawer'
import { isTenantEnabled } from '@/shared/config/tenant'

export default function BeforeOpenDrawerWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <BeforeOpenDrawerProvider
      beforeOpenDrawer={async (info) => {
        // In single-tenant mode, skip tenant check
        if (!isTenantEnabled()) {
          return true
        }

        // Multi-tenant mode: validate tenant exists
        const { formData } = info

        // @ts-expect-error - formData is not typed
        const tenantId = formData.tenant?.id || formData.tenant

        if (!tenantId) {
          toast.error(t('beforeOpenDrawer:tenantRequired' as never))
          return false
        }

        return true
      }}
    >
      {children}
    </BeforeOpenDrawerProvider>
  )
}
