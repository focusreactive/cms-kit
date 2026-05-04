import type { Post } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extractPostText(post: Pick<Post, 'title' | 'excerpt' | 'content'>): string {
  return joinText([post.title, post.excerpt, extractLexicalText(post.content)])
}
