import React from 'react'
import { Skeleton } from '@/shared/ui/shadcn'

export function HeroSkeletonFallback() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center p-0" aria-hidden>
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

export function BlockSkeletonFallback() {
  return (
    <div className="min-h-[200px] space-y-3 p-4" aria-hidden>
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
