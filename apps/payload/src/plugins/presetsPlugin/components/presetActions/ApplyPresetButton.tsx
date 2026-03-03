'use client'

import {
  Button,
  useFieldPath,
  useForm,
  useTranslation,
  useListDrawer,
  toast,
  useAuth,
} from '@payloadcms/ui'
import type { Data, FieldState, FormState } from 'payload'
import { getParentPath, getPresetTypeFromPath } from '../utils'
import { usePresetsConfig } from '../usePresetsConfig'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

export function ApplyPresetButton() {
  const { slug: collectionSlug, presetTypes } = usePresetsConfig()

  const { user } = useAuth()
  const path = useFieldPath()
  const parentPath = getParentPath(path)
  const { getData, getDataByPath, dispatchFields, replaceFieldRow } = useForm()
  const { t } = useTranslation()

  const presetTypeFromPath = getPresetTypeFromPath(parentPath, presetTypes)
  const blockData = getDataByPath<{ blockType?: string } | null>(parentPath) ?? null
  const presetType = presetTypeFromPath ?? blockData?.blockType

  const fullData = getData() as { tenant?: number } | null
  const tenantId = isTenantEnabled()
    ? (fullData?.tenant ?? user?.tenant?.id ?? user?.tenant)
    : getDefaultTenantId()

  const [ListDrawer, , { openDrawer, closeDrawer }] = useListDrawer({
    collectionSlugs: [collectionSlug],
    filterOptions: {
      [collectionSlug]: {
        type: { equals: presetType },
        ...(tenantId ? { tenant: { equals: tenantId } } : {}),
      },
    },
  })

  if (!presetType) {
    return null
  }

  const handleSelect = ({ doc }: { collectionSlug: string; doc: Data }) => {
    const preset = doc as Record<string, unknown>
    if (!preset || preset.type !== presetType) {
      toast.error(t('presetsPlugin:applyPreset:errorInvalidPreset' as never))
      return
    }

    const presetData = preset[presetType] as Record<string, unknown>

    const pathParts = parentPath.split('.')
    const rowIndex = Number(pathParts.pop())
    const arrayPath = pathParts.join('.')

    const subFieldState: Record<string, FieldState> = {}

    Object.entries(presetData).forEach(([key, value]) => {
      subFieldState[key] = {
        value,
        initialValue: value,
        valid: true,
        isModified: true,
        passesCondition: true,
      }
    })

    try {
      if (typeof replaceFieldRow === 'function') {
        replaceFieldRow({
          path: arrayPath,
          rowIndex,
          blockType: presetType,
          schemaPath: arrayPath,
          subFieldState: subFieldState as FormState,
        })
      } else {
        dispatchFields({
          type: 'REPLACE_ROW',
          path: arrayPath,
          rowIndex,
          blockType: presetType,
          subFieldState,
        })
      }

      toast.success(t('presetsPlugin:applyPreset:successApplied' as never, { name: preset.name }))
      closeDrawer()
    } catch (err) {
      console.error('Apply preset error:', err)
      toast.error('Failed to apply preset structure')
    }
  }

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <>
      <Button buttonStyle="secondary" size="large" onClick={handleOpenDrawer}>
        {t('presetsPlugin:applyPreset:applyButton' as never)}
      </Button>
      <ListDrawer onSelect={handleSelect} allowCreate={true} enableRowSelections={false} />
    </>
  )
}
