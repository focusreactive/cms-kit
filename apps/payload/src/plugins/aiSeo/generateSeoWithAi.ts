import { generateText, Output, jsonSchema } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { GenerateSeoInput, GenerateSeoResult } from './types'

const seoSchema = jsonSchema<GenerateSeoResult>({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 60,
      description: 'SEO meta title, under 60 characters',
    },
    description: {
      type: 'string',
      maxLength: 160,
      description: 'SEO meta description, under 160 characters',
    },
  },
  required: ['title', 'description'],
  additionalProperties: false,
})

export async function generateSeoWithAi(
  input: GenerateSeoInput,
): Promise<GenerateSeoResult | null> {
  const { pageTitle, pageContent, apiKey, model = 'gpt-4o-mini' } = input

  console.log(`[aiSeo] Starting AI generation with model: ${model}`)

  if (!apiKey?.trim()) {
    console.error('[aiSeo] API key is empty, cannot generate SEO')
    return null
  }

  try {
    const openai = createOpenAI({ apiKey })

    // Build prompt based on available content
    let prompt = `Generate SEO meta title and meta description for a page. Return only the two strings, no explanations. Meta title must be under 60 characters, meta description under 160 characters.

Page title: ${pageTitle}`

    if (pageContent && pageContent.trim()) {
      const contentToSend = pageContent.slice(0, 3000) // Limit content to avoid token limits
      console.log(
        `[aiSeo] Sending ${contentToSend.length} chars of content to AI (trimmed from ${pageContent.length})`,
      )
      prompt += `

Page content:
${contentToSend}`
    } else {
      console.log(`[aiSeo] No page content available, using only title`)
    }

    console.log(`[aiSeo] Full prompt length: ${prompt.length} characters`)
    console.log(`[aiSeo] Prompt preview:`, prompt.slice(0, 200) + '...')

    console.log(`[aiSeo] Calling OpenAI API...`)
    const { output } = await generateText({
      model: openai(model),
      prompt,
      output: Output.object({ schema: seoSchema }),
    })

    console.log(`[aiSeo] Raw AI response:`, output)

    const result = {
      title: (output.title ?? '').slice(0, 60),
      description: (output.description ?? '').slice(0, 160),
    }

    console.log(`[aiSeo] Final result:`, result)

    return result
  } catch (err) {
    console.error('[aiSeo] generateSeoWithAi failed:', err)
    if (err instanceof Error) {
      console.error('[aiSeo] Error details:', err.message)
      console.error('[aiSeo] Stack trace:', err.stack)
    }
    return null
  }
}
