'use client'
import { ErrorBoundary } from '@/core/ui'
import { useTranslations } from 'next-intl'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title={t('somethingWentWrong')}
      message={t('anErrorOccurredWhileLoadingTheSite', { errorMessage: error.message })}
      backLink={{
        href: '/',
        label: t('returnToHome'),
      }}
    />
  )
}
