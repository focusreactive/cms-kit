import React from 'react'

import type { HeroBlock } from '@/payload-types'

type Props = Pick<HeroBlock, 'enabled' | 'opacity' | 'color'>

export const HeroOverlay: React.FC<Props> = ({ enabled, opacity, color }) => {
  const getOverlayStyle = () => {
    if (!enabled) return {}

    const opacityValue = (opacity ?? 40) / 100
    const baseColor = color === 'white' ? '255, 255, 255' : '0, 0, 0'

    return {
      backgroundColor: `rgba(${baseColor}, ${opacityValue})`,
    }
  }

  return enabled && <div className="absolute inset-0 z-1" style={getOverlayStyle()} />
}
