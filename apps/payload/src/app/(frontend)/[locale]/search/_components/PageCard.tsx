import Image from 'next/image'
import Link from 'next/link'
import type { SearchResultItem } from '@/search/types'

const PLACEHOLDER = '/empty-placeholder.jpg'

type Props = {
  item: SearchResultItem
}

export function PageCard({ item }: Props) {
  return (
    <Link
      href={item.url}
      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={PLACEHOLDER}
          alt={item.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <span className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</span>
    </Link>
  )
}
