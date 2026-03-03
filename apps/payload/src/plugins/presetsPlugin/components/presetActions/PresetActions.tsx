'use client'

import { SaveAsPresetButton } from './SaveAsPresetButton'

export function PresetActions() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <SaveAsPresetButton />
      {/* <ApplyPresetButton /> */}
    </div>
  )
}
