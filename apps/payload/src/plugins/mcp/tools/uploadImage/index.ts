import type { PayloadRequest } from 'payload'
import { z } from 'zod'
import { resolveSource } from './resolveSource'

interface UploadedEntry {
  id: string | number
  url?: string | null
  filename?: string | null
  source: string
}
interface FailedEntry {
  source: string
  error: string
}

interface ImageInput {
  source: string
  alt: string
  filename?: string
}

interface Args {
  images: ImageInput[]
}

export const uploadImage = {
  name: 'uploadImage',
  description:
    'Upload one or more images to the media library from local file paths (dev only) or remote URLs. ' +
    'Call this tool BEFORE any create/update operation that requires a media relationship field. ' +
    'Pass the returned `id` values as the value of those fields in subsequent create/update calls. ' +
    'Always derive `alt` from the visible or described image content — never copy the filename. ' +
    'Uploads are processed concurrently (up to 3 at a time). ' +
    'Partial failures are tolerated — check the `failed` array in the response.',
  parameters: {
    images: z
      .array(
        z.object({
          source: z
            .string()
            .describe(
              'Absolute local file path (development only) or http(s):// URL of the image to upload.',
            ),
          alt: z
            .string()
            .describe(
              'Concise description of the image content. Derive from what is visible — never copy the filename.',
            ),
          filename: z
            .string()
            .optional()
            .describe(
              'Override for the stored filename including extension. Auto-derived from source if omitted.',
            ),
        }),
      )
      .min(1)
      .describe('List of images to upload.'),
  } satisfies z.ZodRawShape,
  handler: async ({ images }: Args, req: PayloadRequest) => {
    let running = 0
    const uploadQueue: Array<() => void> = []

    const subscribeToUpload = (): Promise<void> => {
      return new Promise((resolve) => {
        if (running < 3) {
          running++
          resolve()
        } else {
          uploadQueue.push(() => {
            running++
            resolve()
          })
        }
      })
    }

    const uploadNext = () => {
      running--

      const next = uploadQueue.shift()

      next?.()
    }

    const uploaded: UploadedEntry[] = []
    const failed: FailedEntry[] = []

    await Promise.all(
      images.map(async ({ source, alt, filename: filenameOverride }) => {
        await subscribeToUpload()

        try {
          const { buffer, mimeType, filename } = await resolveSource(source, filenameOverride)

          const file = {
            data: buffer,
            mimetype: mimeType,
            name: filename,
            size: buffer.length,
          }

          const result = await req.payload.create({
            collection: 'media',
            data: { alt },
            file,
            overrideAccess: true,
          })

          uploaded.push({
            id: result.id,
            url: result.url,
            filename: result.filename,
            source,
          })
        } catch (e) {
          failed.push({
            source,
            error: e instanceof Error ? e.message : String(e),
          })
        } finally {
          uploadNext()
        }
      }),
    )

    const allFailed = uploaded.length === 0 && failed.length > 0

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ uploaded, failed }),
        },
      ],
      ...(allFailed ? { isError: true } : null),
    }
  },
}
