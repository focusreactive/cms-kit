import type { PayloadRequest } from 'payload'
import { z } from 'zod'

export const uploadImage = {
  name: 'uploadImage',
  description:
    'Upload a base64-encoded image file and create a media record. Returns the new media document id, url, and filename.',
  parameters: {
    filename: z.string().describe('File name including extension, e.g. "hero.jpg"'),
    data: z.string().describe('Base64-encoded file contents (no data-URI prefix)'),
    alt: z.string().describe('Alt text stored on the media record'),
    mimeType: z.string().optional().describe('MIME type of the file. Defaults to "image/jpeg"'),
  } satisfies z.ZodRawShape,
  handler: async (args: Record<string, unknown>, req: PayloadRequest) => {
    const {
      filename,
      data,
      alt,
      mimeType = 'image/jpeg',
    } = args as { filename: string; data: string; alt: string; mimeType?: string }

    const buffer = Buffer.from(data, 'base64')
    const file = new File([buffer], filename, { type: mimeType })

    const result = await req.payload.create({
      collection: 'media',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { alt } as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: file as any,
      overrideAccess: false,
      req,
    })

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            id: result.id,
            url: (result as unknown as Record<string, unknown>).url,
            filename: (result as unknown as Record<string, unknown>).filename,
          }),
        },
      ],
    }
  },
}
