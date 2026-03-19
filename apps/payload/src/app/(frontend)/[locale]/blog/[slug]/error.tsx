'use client'
import { ErrorBoundary } from '@/core/ui'
import { BLOG_CONFIG } from '@/core/config/blog'

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Error loading post"
      message={`Failed to load post content: ${error.message}`}
      backLink={{
        href: BLOG_CONFIG.basePath,
        label: 'Return to blog',
      }}
      wrapperClassName="pt-16 pb-16"
    />
  )
}
