'use client'

import { useEffect } from 'react'
import { Container, Section, Button } from '@/shared/ui'
import { Link } from '@/shared/ui'
import { useTranslations } from 'next-intl'

type ErrorBoundaryProps = {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  message?: string
  backLink?: {
    href: string
    label: string
  }
  wrapperClassName?: string
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error,
  reset,
  title,
  message,
  backLink,
  wrapperClassName,
}) => {
  const t = useTranslations('common')
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  const errorMessage = message || t('common.somethingWentWrong')

  return (
    <div className={wrapperClassName}>
      <Section>
        <Container maxWidth="4xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground text-lg">{errorMessage}</p>
              </div>

              {error.message && process.env.NODE_ENV === 'development' && (
                <div className="mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-2xl">
                  <p className="text-sm font-mono text-left break-words">{error.message}</p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={reset} variant="default">
                  Try again
                </Button>
                {backLink && (
                  <Button asChild variant="outline">
                    <Link href={backLink.href}>{backLink.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
