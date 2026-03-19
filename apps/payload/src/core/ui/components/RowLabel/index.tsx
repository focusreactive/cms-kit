'use client'

import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

const generateRowLabel = (rowNumber: number | undefined, label: string | undefined | null) => {
  if (label) {
    return `Row ${rowNumber !== undefined ? rowNumber + 1 : ''}: ${label}`
  }
  return `Row ${rowNumber !== undefined ? rowNumber + 1 : ''}`
}

interface RowLabelData {
  label?: string | null
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<RowLabelData>()
  return generateRowLabel(data.rowNumber, data?.data?.label)
}

export const RowLabelGroupName: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  return generateRowLabel(data.rowNumber, data?.data?.link?.label)
}
