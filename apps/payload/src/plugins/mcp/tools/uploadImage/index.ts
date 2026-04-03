import type { PayloadRequest } from 'payload'
import { z } from 'zod'
import { resolveSource } from './resolveSource'

interface Args {
  source: string
  alt: string
  filename?: string
}

export const uploadImage = {
  name: 'uploadImage',
  description:
    'Upload an image to the media library from a local file path (dev only) or a remote URL. ' +
    'Call this tool BEFORE any create/update operation that requires a media relationship field. ' +
    'Pass the returned `id` as the value of that field in the subsequent create/update call. ' +
    'Always derive `alt` from the visible or described image content — never copy the filename.',
  parameters: {
    source: z
      .string()
      .describe(
        'Absolute local file path (development only) or http(s):// URL of the image to upload.',
      ),
    alt: z
      .string()
      .describe(
        'Concise description of the image content, e.g. "A mountain range at sunset with orange sky". Derive from what is visible — never copy the filename.',
      ),
    filename: z
      .string()
      .optional()
      .describe(
        'Override for the stored filename including extension, e.g. "mountain-sunset.jpg". Auto-derived from the source path or URL basename if omitted.',
      ),
  } satisfies z.ZodRawShape,
  handler: async ({ source, alt, filename: filenameOverride }: Args, req: PayloadRequest) => {
    let buffer: Buffer
    let mimeType: string
    let filename: string

    try {
      ;({ buffer, mimeType, filename } = await resolveSource(source, filenameOverride))
    } catch (e) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
          },
        ],
        isError: true,
      }
    }

    const file = {
      data: buffer,
      mimetype: mimeType,
      name: filename,
      size: buffer.length,
    }

    try {
      const result = await req.payload.create({
        collection: 'media',
        data: { alt },
        file,
        overrideAccess: true,
      })

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              id: result.id,
              url: result.url,
              filename: result.filename,
            }),
          },
        ],
      }
    } catch (e) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
          },
        ],
        isError: true,
      }
    }
  },
}
