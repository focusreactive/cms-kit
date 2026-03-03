import type { Author } from '@/payload-types'

type AuthorInput = number | Author | null | undefined

interface SchemaAuthor {
  '@type': 'Person'
  'name': string
}

export function formatAuthorsToSchema(
  authors: AuthorInput[] | null | undefined
): SchemaAuthor[] | null {
  if (!authors || authors.length === 0) {
    return null
  }

  const schemaAuthors = authors
    .filter((author): author is Author => {
      return typeof author === 'object' && author !== null && Boolean(author.name)
    })
    .map((author) => ({
      '@type': 'Person' as const,
      'name': author.name,
    }))

  return schemaAuthors.length > 0 ? schemaAuthors : null
}
