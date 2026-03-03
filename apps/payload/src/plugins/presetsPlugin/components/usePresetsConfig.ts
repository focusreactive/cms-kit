'use client'

import { useConfig } from '@payloadcms/ui'
import type { PresetsPluginClientConfig } from '../plugin'

export function usePresetsConfig(): PresetsPluginClientConfig {
  const { config } = useConfig()
  const presetsConfig = config?.admin?.custom?.presetsPlugin as
    | PresetsPluginClientConfig
    | undefined

  if (!presetsConfig) {
    throw new Error(
      'presetsPlugin config not found. Make sure presetsPlugin is added to your Payload config.',
    )
  }

  return presetsConfig
}
