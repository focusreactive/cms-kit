const SIZE = '480x320'
const BG = 'e5e7eb'
const FG = '6b7280'

export function getBlockPreviewImage(label: string): {
  imageURL: string
  imageAltText: string
} {
  const textParam = label.replace(/\s+/g, '+')
  return {
    imageURL: `https://placehold.co/${SIZE}/${BG}/${FG}?text=${textParam}`,
    imageAltText: `${label} block preview`,
  }
}
