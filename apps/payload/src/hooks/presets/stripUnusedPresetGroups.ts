import type { CollectionBeforeChangeHook } from 'payload'
import { PRESET_BLOCK_TYPES, type PresetBlockType } from '@/core/constants/presets'

export const stripUnusedPresetGroups: CollectionBeforeChangeHook = ({ data, req }) => {
  const type = data?.type as PresetBlockType

  if (!type || !PRESET_BLOCK_TYPES.includes(type)) return data

  const doc = data as Record<string, unknown>
  for (const key of PRESET_BLOCK_TYPES) {
    if (key !== type) delete doc[key]
  }

  req.payload?.logger?.info?.(
    `Stripped unused preset groups: ${type} ${JSON.stringify(data, null, 2)}`,
  )

  return data
}
