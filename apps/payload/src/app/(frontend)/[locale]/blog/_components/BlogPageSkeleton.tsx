import { Container, Section } from '@/core/ui'

export function BlogPageSkeleton() {
  return (
    <Section>
      <Container maxWidth="7xl">
        <div className="mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <div className="animate-pulse rounded-md bg-primaryLightColor h-10 w-48" />
          </div>
        </div>

        <div className="mb-8">
          <div className="animate-pulse rounded-md bg-primaryLightColor h-6 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <div className="animate-pulse rounded-md bg-primaryLightColor aspect-video w-full rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="animate-pulse rounded-md bg-primaryLightColor h-4 w-3/4" />
                <div className="animate-pulse rounded-md bg-primaryLightColor h-4 w-full" />
                <div className="animate-pulse rounded-md bg-primaryLightColor h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
