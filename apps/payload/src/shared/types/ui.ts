import React from 'react'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
  icon?: React.ReactNode
}
