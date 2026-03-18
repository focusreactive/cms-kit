import React from 'react'

export function HeroSkeletonFallback() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center p-0" aria-hidden>
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        <div className="animate-pulse rounded-md bg-primaryLightColor h-12 w-3/4" />
        <div className="animate-pulse rounded-md bg-primaryLightColor h-6 w-full" />
        <div className="animate-pulse rounded-md bg-primaryLightColor h-6 w-5/6" />
        <div className="flex gap-3">
          <div className="animate-pulse rounded-md bg-primaryLightColor h-10 w-32" />
          <div className="animate-pulse rounded-md bg-primaryLightColor h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

export function BlockSkeletonFallback() {
  return (
    <div className="min-h-[200px] space-y-3 p-4" aria-hidden>
      <div className="animate-pulse rounded-md bg-primaryLightColor h-8 w-1/3" />
      <div className="animate-pulse rounded-md bg-primaryLightColor h-4 w-full" />
      <div className="animate-pulse rounded-md bg-primaryLightColor h-4 w-full" />
      <div className="animate-pulse rounded-md bg-primaryLightColor h-24 w-full" />
    </div>
  )
}
