import type { Field } from 'payload'
import { heroFields } from '@/fields/heroFields'
import { testimonialsListFields } from '@/fields/testimonialsListFields'
import { DEFAULT_VALUES } from './defaultValues'

export const PRESET_BLOCK_TYPES = ['hero', 'testimonialsList'] as const

export type PresetBlockType = (typeof PRESET_BLOCK_TYPES)[number]

export const PRESET_TYPES_CONFIG: Record<
  PresetBlockType,
  { label: { en: string; es: string }; fields: Field[]; value: PresetBlockType }
> = {
  hero: {
    value: 'hero',
    label: DEFAULT_VALUES.blocks.hero.title,
    fields: heroFields,
  },
  testimonialsList: {
    value: 'testimonialsList',
    label: DEFAULT_VALUES.blocks.testimonialsList.title,
    fields: testimonialsListFields,
  },
}
