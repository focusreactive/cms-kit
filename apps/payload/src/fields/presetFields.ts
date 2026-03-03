import { createPresetActionsField } from '@/plugins/presetsPlugin'

export function createPresetFields() {
  const presetFields = createPresetActionsField()

  return {
    presetFields,
  }
}
