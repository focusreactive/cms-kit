import { injectSaveAsPresetButton } from '@focus-reactive/payload-plugin-presets'

export function createPresetFields() {
  const presetFields = injectSaveAsPresetButton()

  return {
    presetFields,
  }
}
