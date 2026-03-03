'use client'

import React, { useEffect } from 'react'
import {
  BlocksField,
  useForm,
  useAuth,
  useDrawerSlug,
  Drawer,
  useModal,
  toast,
  useTranslation,
} from '@payloadcms/ui'
import type {
  BlocksFieldClient,
  ClientBlock,
  FormState,
  FieldState,
  SanitizedFieldPermissions,
} from 'payload'
import { usePresetsConfig } from '../usePresetsConfig'
import { BlockSelectorWithPresets } from './BlockSelectorWithPresets'
import { useBeforeOpenDrawer } from './BeforeOpenDrawerContext'
import type { Preset } from '../shared'
import './BlocksFieldWithPresets.scss'

type BlocksFieldWithPresetsProps = {
  field: Omit<BlocksFieldClient, 'type'> & Partial<Pick<BlocksFieldClient, 'type'>>
  path: string
  schemaPath: string
  indexPath: string
  parentPath: string
  parentSchemaPath: string
  permissions?: SanitizedFieldPermissions
  readOnly: boolean
}

export const BlocksFieldWithPresets: React.FC<BlocksFieldWithPresetsProps> = (props) => {
  const { field, path, schemaPath, readOnly } = props
  const blocks = field.blocks as ClientBlock[]

  const { excludeKeys } = usePresetsConfig()
  const beforeOpenDrawer = useBeforeOpenDrawer()
  const { user } = useAuth()
  const { getData, getDataByPath, addFieldRow } = useForm()
  const { openModal, closeModal } = useModal()
  const { t } = useTranslation()

  const customDrawerSlug = useDrawerSlug('blocks-with-presets-drawer')

  const fullData = getData() as {
    tenant?: number
    [key: string]: unknown
  } | null
  const tenantId = fullData?.tenant ?? user?.tenant?.id ?? user?.tenant

  const blocksData = (getDataByPath<unknown[]>(path) || []) as unknown[]
  const addRowIndex = blocksData.length

  const handleBlockSelect = (blockType: string, preset?: Preset | null) => {
    if (preset) {
      const presetData = preset[blockType] as Record<string, unknown> | undefined

      if (presetData) {
        const subFieldState: Record<string, FieldState> = {}

        Object.entries(presetData).forEach(([key, value]) => {
          if (excludeKeys.includes(key)) return

          subFieldState[key] = {
            value,
            initialValue: value,
            valid: true,
            passesCondition: true,
          }
        })

        addFieldRow({
          path,
          rowIndex: addRowIndex,
          schemaPath,
          blockType,
          subFieldState: subFieldState as FormState,
        })

        toast.success(`Added ${blockType} with preset: ${preset.name}`)
      } else {
        addFieldRow({ path, rowIndex: addRowIndex, schemaPath, blockType })
      }
    } else {
      addFieldRow({ path, rowIndex: addRowIndex, schemaPath, blockType })
    }

    closeModal(customDrawerSlug)
  }

  const handleOpenDrawer = async () => {
    if (beforeOpenDrawer) {
      const allowed = await beforeOpenDrawer({
        field,
        path,
        schemaPath,
        readOnly,
        permissions: props.permissions,
        blocksData,
        formData: fullData ?? {},
      })
      if (!allowed) return
    }
    openModal(customDrawerSlug)
  }

  return (
    <div className="blocks-field-with-presets">
      <BlocksField {...props} />

      {!readOnly && (
        <div style={{ marginTop: '16px' }}>
          <button className="blocks-field__drawer-toggler" type="button" onClick={handleOpenDrawer}>
            <span
              aria-disabled="false"
              className="btn btn--icon btn--icon-style-with-border btn--size-medium btn--icon-position-left btn--withoutPopup btn--style-icon-label btn--withoutPopup"
            >
              <span className="btn__content">
                <span className="btn__label">
                  {t('presetsPlugin:blocksDrawer:addBlockWithPreset' as never)}
                </span>
                <span className="btn__icon">
                  <svg
                    className="icon icon--plus"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke"
                      d="M5.33333 9.99998H14.6667M9.99999 5.33331V14.6666"
                      strokeLinecap="square"
                    ></path>
                  </svg>
                </span>
              </span>
            </span>
          </button>
        </div>
      )}

      <Drawer
        slug={customDrawerSlug}
        title={t('presetsPlugin:blocksDrawer:addBlockTitle' as never)}
      >
        <BlockSelectorWithPresets
          blocks={blocks}
          onSelect={handleBlockSelect}
          tenantId={tenantId}
        />
      </Drawer>
    </div>
  )
}
