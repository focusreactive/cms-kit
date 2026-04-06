export type SearchCollection = 'page' | 'post'

export interface SearchResultItem {
  documentId: string
  collection: SearchCollection
  title: string
  slug: string
  url: string
  imageUrl: string | null
  imageAlt: string | null
  score: number
}

export interface SearchResultGroup {
  collection: SearchCollection
  items: SearchResultItem[]
  topScore: number
}

export interface SearchResponse {
  groups: SearchResultGroup[]
}
