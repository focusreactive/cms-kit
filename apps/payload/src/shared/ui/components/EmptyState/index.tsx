import React from 'react'
import { cn } from '@/shared/lib/utils'
import type { EmptyStateProps } from '@/shared/types'

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing found',
  description = 'Try changing the search parameters or come back later',
  className,
  icon,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className,
      )}
    >
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-md">{description}</p>}
    </div>
  )
}
