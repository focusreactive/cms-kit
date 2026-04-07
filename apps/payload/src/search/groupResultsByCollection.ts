import type { SearchResultItem, SearchResultGroup, SearchCollection } from './types'

export function groupResultsByCollection(items: SearchResultItem[]): SearchResultGroup[] {
  const map = new Map<SearchCollection, SearchResultItem[]>()

  for (const item of items) {
    const existing = map.get(item.collection) ?? []
    map.set(item.collection, [...existing, item])
  }

  return Array.from(map.entries())
    .map(([collection, groupItems]) => ({
      collection,
      items: groupItems,
      topScore: groupItems[0]?.score ?? 0,
    }))
    .sort((a, b) => b.topScore - a.topScore)
}
