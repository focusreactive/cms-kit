import { Post } from '@/payload-types'

export const formatAuthors = (
  authors: NonNullable<NonNullable<Post['authors']>[number]>[],
) => {
  const authorNames = authors.map((author) => typeof author === 'object' ? author.name : '').filter(Boolean)

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1) return authorNames[0]

  return authorNames.join(', ')
}
