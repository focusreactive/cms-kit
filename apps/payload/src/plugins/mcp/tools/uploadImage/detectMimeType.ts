interface MimeSignature {
  bytes: number[]
  mime: string
  ext: string
}

const MIME_SIGNATURES: MimeSignature[] = [
  { bytes: [0xff, 0xd8, 0xff], mime: 'image/jpeg', ext: 'jpg' },
  { bytes: [0x89, 0x50, 0x4e, 0x47], mime: 'image/png', ext: 'png' },
  { bytes: [0x47, 0x49, 0x46, 0x38], mime: 'image/gif', ext: 'gif' },
  { bytes: [0x52, 0x49, 0x46, 0x46], mime: 'image/webp', ext: 'webp' },
]

export function detectMimeType(buffer: Buffer): Omit<MimeSignature, 'bytes'> {
  for (const signature of MIME_SIGNATURES) {
    if (signature.bytes.every((b, i) => buffer[i] === b)) {
      if (signature.mime === 'image/webp') {
        if (buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
          return {
            mime: 'image/webp',
            ext: 'webp',
          }
        }

        continue
      }

      return {
        mime: signature.mime,
        ext: signature.ext,
      }
    }
  }

  if (buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii')

    if (brand === 'avif' || brand === 'avis') {
      return {
        mime: 'image/avif',
        ext: 'avif',
      }
    }
  }

  return {
    mime: 'image/jpeg',
    ext: 'jpg',
  }
}
