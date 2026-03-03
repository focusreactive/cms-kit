'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslation, Popup, ShimmerEffect } from '@payloadcms/ui'
import type { ClientBlock, CollectionSlug } from 'payload'
import { usePresetsConfig } from '../usePresetsConfig'
import { DefaultBlockImage, type Preset } from '../shared'
import './BlockSelectorWithPresets.scss'
import { PresetAdminComponentCell } from '../PresetAdminComponentCell'
import { isTenantEnabled, getDefaultTenantId } from '@/shared/config/tenant'

type BlockSelectorWithPresetsProps = {
  blocks: (ClientBlock | string)[]
  onSelect: (blockType: string, preset?: Preset | null) => void
  tenantId?: number | string | null
}

export const BlockSelectorWithPresets: React.FC<BlockSelectorWithPresetsProps> = ({
  blocks,
  onSelect,
  tenantId,
}) => {
  const { slug: presetsCollectionSlug, presetTypes } = usePresetsConfig()
  const { i18n } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeBlockSlug, setActiveBlockSlug] = useState<string | null>(null)
  const [isLoadingPresets, setIsLoadingPresets] = useState(false)
  const [presetsCache, setPresetsCache] = useState<Preset[]>([])

  // Filter and group blocks
  const clientBlocks = blocks.filter((block): block is ClientBlock => {
    if (typeof block === 'string') return false
    if (!searchTerm) return true
    const label = getBlockLabel(block, i18n.language)
    return label.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const groupedBlocks = clientBlocks.reduce(
    (acc, block) => {
      const custom = block.admin?.custom as { group?: string } | undefined
      const group = custom?.group || 'Blocks'
      if (!acc[group]) acc[group] = []
      acc[group].push(block)
      return acc
    },
    {} as Record<string, ClientBlock[]>,
  )

  // Fetch presets for specific block type
  const fetchPresets = async () => {
    setIsLoadingPresets(true)
    try {
      const params = new URLSearchParams()

      const effectiveTenantId = isTenantEnabled() ? tenantId : tenantId || getDefaultTenantId()

      if (effectiveTenantId) {
        params.append('where[tenant][equals]', String(effectiveTenantId))
      }

      params.append('depth', '0')
      params.append('limit', '50')

      const response = await fetch(`/api/${presetsCollectionSlug}?${params.toString()}`)
      const data = await response.json()
      const fetchedPresets = data.docs || []

      setPresetsCache(fetchedPresets)
    } catch (error) {
      console.error('Failed to fetch presets:', error)
      setPresetsCache([])
    } finally {
      setIsLoadingPresets(false)
    }
  }

  const handleBlockClick = (block: ClientBlock) => {
    const hasPresets = presetTypes.includes(block.slug)

    if (!hasPresets) {
      onSelect(block.slug)
      return
    }

    if (activeBlockSlug === block.slug) {
      setActiveBlockSlug(null)
    } else {
      setActiveBlockSlug(block.slug)
    }
  }

  const handlePresetSelect = (blockType: string, preset: Preset | null) => {
    onSelect(blockType, preset)
    setActiveBlockSlug(null)
  }

  // Get presets for specific block from cache
  const getBlockPresets = (blockSlug: string): Preset[] => {
    return presetsCache.filter((preset) => preset.type === blockSlug)
  }

  useEffect(() => {
    fetchPresets()
  }, [])

  // Show loading state while fetching presets
  if (isLoadingPresets) {
    return (
      <>
        <ShimmerEffect height="40px" />

        <div className="blocks-drawer__blocks-wrapper">
          <div className="blocks-drawer__blocks">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="blocks-drawer__block">
                <ShimmerEffect key={i} height="100px" animationDelay={`${i * 50}ms`} />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="block-search">
        <input
          className="block-search__input"
          placeholder="Search for a block"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="icon icon--search"
          fill="none"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke"
            d="M16 16L13.1333 13.1333M14.6667 9.33333C14.6667 12.2789 12.2789 14.6667 9.33333 14.6667C6.38781 14.6667 4 12.2789 4 9.33333C4 6.38781 6.38781 4 9.33333 4C12.2789 4 14.6667 6.38781 14.6667 9.33333Z"
            strokeLinecap="square"
          />
        </svg>
      </div>

      <div className="blocks-drawer__blocks-wrapper">
        {Object.entries(groupedBlocks).map(([group, groupBlocks]) => (
          <div key={group}>
            {Object.keys(groupedBlocks).length > 1 && (
              <p className="blocks-drawer__block-label">{group}</p>
            )}
            <ul className="blocks-drawer__blocks">
              {groupBlocks.map((block) => {
                const hasPresets = presetTypes.includes(block.slug)
                const isActive = activeBlockSlug === block.slug
                const label = getBlockLabel(block, i18n.language)
                const blockPresets = getBlockPresets(block.slug)

                return (
                  <li key={block.slug} className="blocks-drawer__block">
                    <BlockCard
                      block={block}
                      label={label}
                      hasPresets={hasPresets}
                      isActive={isActive}
                      presets={blockPresets}
                      onBlockClick={() =>
                        hasPresets ? handleBlockClick(block) : onSelect(block.slug)
                      }
                      onPresetSelect={handlePresetSelect}
                      onClose={() => setActiveBlockSlug(null)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

// Reusable BlockCard component
type BlockCardProps = {
  block: ClientBlock
  label: string
  hasPresets: boolean
  isActive: boolean
  presets: Preset[]
  onBlockClick: () => void
  onPresetSelect: (blockType: string, preset: Preset | null) => void
  onClose: () => void
}

const BlockCard: React.FC<BlockCardProps> = ({
  block,
  label,
  hasPresets,
  isActive,
  presets,
  onBlockClick,
  onPresetSelect,
  onClose,
}) => {
  if (!hasPresets) {
    return (
      <button
        className="thumbnail-card thumbnail-card--has-on-click thumbnail-card--align-label-center"
        title={label}
        type="button"
        onClick={onBlockClick}
      >
        <BlockThumbnail imageURL={block.imageURL} label={label} />
        <div className="thumbnail-card__label">{label}</div>
      </button>
    )
  }

  return (
    <Popup
      buttonType="custom"
      forceOpen={isActive}
      horizontalAlign="right"
      onToggleOpen={(open) => {
        if (!open) onClose()
      }}
      className="blocks-drawer__presets-popup-wrapper"
      render={({ close }) => (
        <PresetsList
          blockSlug={block.slug}
          label={label}
          presets={presets}
          onSelect={(preset) => {
            onPresetSelect(block.slug, preset)
            close()
          }}
        />
      )}
      showOnHover={false}
      size="large"
      verticalAlign="top"
      button={
        <button
          className={`thumbnail-card thumbnail-card--has-on-click thumbnail-card--align-label-center ${isActive ? 'thumbnail-card--active' : ''}`}
          title={label}
          type="button"
          onClick={onBlockClick}
        >
          <BlockThumbnail imageURL={block.imageURL} label={label} />
          <div className="thumbnail-card__label">
            {label}{' '}
            {presets.length > 0
              ? `(${presets.filter((preset) => preset.type === block.slug).length})`
              : ''}
          </div>
        </button>
      }
    />
  )
}

// Reusable BlockThumbnail component
type BlockThumbnailProps = {
  imageURL?: string | null
  label: string
}

const BlockThumbnail: React.FC<BlockThumbnailProps> = ({ imageURL, label }) => (
  <div className="thumbnail-card__thumbnail">
    {imageURL ? (
      <Image src={imageURL} alt={label} width={231} height={151} unoptimized />
    ) : (
      <div className="blocks-drawer__default-image">
        <DefaultBlockImage />
      </div>
    )}
  </div>
)

type PresetsListProps = {
  blockSlug: string
  label: string
  presets: Preset[]
  onSelect: (preset: Preset | null) => void
}

const PresetsList: React.FC<PresetsListProps> = ({ blockSlug, label, presets, onSelect }) => {
  const filteredPresets = presets.filter((preset) => preset.type === blockSlug)
  const { slug: presetsCollectionSlug, mediaCollection } = usePresetsConfig()
  const { t } = useTranslation()

  return (
    <div className="blocks-drawer__presets-popup">
      {/* Empty option */}
      <button
        type="button"
        className="popover__thumbnail-card thumbnail-card thumbnail-card--has-on-click thumbnail-card--align-label-center"
        onClick={() => onSelect(null)}
      >
        <div className="thumbnail-card__thumbnail">
          <PresetAdminComponentCell
            collectionSlug={presetsCollectionSlug}
            rowData={{}}
            cellData={null}
            field={{
              type: 'upload',
              name: 'preview',
              relationTo: mediaCollection as CollectionSlug,
            }}
          />
        </div>
        <div style={{ fontWeight: 'normal' }} className="thumbnail-card__label">
          Empty {label}
        </div>
      </button>

      {/* Presets list */}
      {filteredPresets.length > 0 &&
        filteredPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="popover__thumbnail-card thumbnail-card thumbnail-card--has-on-click thumbnail-card--align-label-center"
            onClick={() => onSelect(preset)}
          >
            <div className="thumbnail-card__thumbnail">
              <PresetAdminComponentCell
                collectionSlug={presetsCollectionSlug}
                rowData={preset}
                cellData={preset.preview}
                field={{
                  type: 'upload',
                  name: 'preview',
                  relationTo: mediaCollection as CollectionSlug,
                }}
              />
            </div>
            <div className="thumbnail-card__label">{preset.name}</div>
          </button>
        ))}

      {/* No presets message */}
      {filteredPresets.length === 0 && (
        <div className="blocks-drawer__presets-empty">
          {t('presetsPlugin:blocksDrawer:noPresetsAvailable' as never)}
        </div>
      )}
    </div>
  )
}

function getBlockLabel(block: ClientBlock, locale: string): string {
  if (typeof block.labels?.singular === 'string') {
    return block.labels.singular
  }
  if (block.labels?.singular && typeof block.labels.singular === 'object') {
    const labels = block.labels.singular as Record<string, string>
    return labels[locale] || labels.en || block.slug
  }
  return block.slug
}
