'use server'

import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

const MAX_CHARS = 24_000

export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: text.slice(0, MAX_CHARS),
  })

  return embedding
}
