import { createPresetActionsField } from '@focus-reactive/payload-plugin-presets'

export function createPresetFields() {
  const presetFields = createPresetActionsField()

  return {
    presetFields,
  }
}
