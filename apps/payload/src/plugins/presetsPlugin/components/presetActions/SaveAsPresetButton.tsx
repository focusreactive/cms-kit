'use client'

import {
  Button,
  useFieldPath,
  useForm,
  useTranslation,
  toast,
  useAuth,
  useDocumentDrawer,
} from '@payloadcms/ui'
import { getParentPath, getPresetTypeFromPath } from '../utils'
import { usePresetsConfig } from '../usePresetsConfig'

/** Recursively remove excluded keys from object at all nesting levels */
function cleanPresetData(obj: unknown, excludeKeys: Set<string>): unknown {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map((item) => cleanPresetData(item, excludeKeys))
  }

  const cleaned: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (!excludeKeys.has(key)) {
      cleaned[key] = cleanPresetData(value, excludeKeys)
    }
  }
  return cleaned
}

export function SaveAsPresetButton() {
  const { slug, presetTypes, excludeKeys } = usePresetsConfig()
  const excludeSet = new Set(excludeKeys)

  const [DocumentDrawer, , { openDrawer, closeDrawer }] = useDocumentDrawer({
    collectionSlug: slug,
  })

  const { user } = useAuth()
  const path = useFieldPath()
  const parentPath = getParentPath(path)
  const { getData, getDataByPath } = useForm()
  const tenantId = getData()?.tenant ?? user?.tenant?.id ?? user?.tenant ?? null

  const { t } = useTranslation()

  const presetTypeFromPath = getPresetTypeFromPath(parentPath, presetTypes)
  const blockData = getDataByPath<{ blockType?: string } | null>(parentPath) ?? null
  const presetType = presetTypeFromPath ?? blockData?.blockType

  if (!presetType) {
    return null
  }

  const groupData = getDataByPath<Record<string, unknown>>(parentPath)
  const data = {
    name: `${presetType.charAt(0).toUpperCase() + presetType.slice(1)} ${new Date().toLocaleDateString()}`,
    type: presetType,
    [presetType]: cleanPresetData(groupData ?? {}, excludeSet),
    tenant: tenantId,
  }

  return (
    <>
      <Button
        buttonStyle="secondary"
        size="medium"
        onClick={openDrawer}
        extraButtonProps={{ style: { margin: '0' } }}
      >
        {t('presetsPlugin:presetActions:saveButton' as never)}
      </Button>

      <DocumentDrawer
        initialData={data}
        onSave={() => {
          toast.success(t('presetsPlugin:presetActions:successSaved' as never, { name: data.name }))
          closeDrawer()
        }}
      />
    </>
  )
}
