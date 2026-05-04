import type { Media as MediaType } from '@/payload-types'

export interface ISectionData {
  id?: string | null
  theme?: 'light' | 'dark' | 'light-gray' | 'dark-gray' | null
  paddingY?: 'none' | 'base' | 'large' | null
  paddingX?: 'none' | 'base' | null
  maxWidth?: 'none' | 'base' | null
  background?: {
    media?: MediaType | number | null
    overlay?: 'black' | 'white' | null
    opacity?: number | null
  }
}

export interface ISectionContainerProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  sectionData: ISectionData
}
