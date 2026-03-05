import { Container, Section } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/shadcn'

export function BlogPageSkeleton() {
  return (
    <Section>
      <Container maxWidth="7xl">
        <div className="mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <Skeleton className="aspect-video w-full rounded-t-lg" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
