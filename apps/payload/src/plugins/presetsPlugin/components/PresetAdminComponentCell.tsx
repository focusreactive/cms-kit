'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { DefaultCellComponentProps, UploadFieldClient } from 'payload'
import Image from 'next/image'
import { EmptyPlaceholder, type MediaData } from './shared'
import { usePresetsConfig } from './usePresetsConfig'

import './PresetAdminComponent.scss'

type CellData = number | MediaData | null | undefined

interface PresetPreviewCellProps extends Omit<
  DefaultCellComponentProps<UploadFieldClient>,
  'cellData'
> {
  cellData: CellData
}

export const PresetAdminComponentCell: React.FC<PresetPreviewCellProps> = ({ cellData }) => {
  const { mediaCollection } = usePresetsConfig()
  const [media, setMedia] = useState<MediaData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const mediaId = typeof cellData === 'number' ? cellData : cellData?.id

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setPopupPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
      })
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    if (!mediaId) {
      setIsLoading(false)
      return
    }

    if (typeof cellData === 'object' && cellData !== null) {
      setMedia(cellData as MediaData)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    fetch(`/api/${mediaCollection}/${mediaId}`)
      .then((res) => res.json())
      .then((data) => {
        setMedia(data)
        setIsLoading(false)
      })
      .catch(() => {
        setMedia(null)
        setIsLoading(false)
      })
  }, [mediaId, cellData, mediaCollection])

  if (isLoading) {
    return (
      <div className="file">
        <div className="thumbnail thumbnail--size-small file__thumbnail preset-preview-cell__skeleton" />
      </div>
    )
  }

  const mediaUrl = media?.url

  if (!media || !mediaUrl) {
    return <EmptyPlaceholder width={40} height={40} />
  }

  return (
    <div
      ref={containerRef}
      className="preset-preview-cell"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        alt={media.alt || 'Preview'}
        src={mediaUrl}
        width={40}
        height={40}
        className="preset-preview-cell__thumbnail"
        unoptimized
      />
      {isHovered &&
        createPortal(
          <div
            className="preset-preview-cell__popup"
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
            }}
          >
            <Image
              alt={media.alt || 'Preview'}
              src={mediaUrl}
              width={300}
              height={300}
              className="preset-preview-cell__popup-image"
              unoptimized
            />
          </div>,
          document.body,
        )}
    </div>
  )
}
