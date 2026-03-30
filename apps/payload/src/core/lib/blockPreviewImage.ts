const SIZE = '480x320'
const BG = 'e5e7eb'
const FG = '6b7280'

const PREVIEW_IMAGES: Record<string, string> = {
  Hero: '/block-preview-images/hero.png',
  'Content Section': '/block-preview-images/content-section.png',
  Carousel: '/block-preview-images/carousel.png',
  'Cards Grid': '/block-preview-images/cards-grid.png',
  'Links List': '/block-preview-images/links-list.png',
  'FAQ Section': '/block-preview-images/faq.png',
  Logos: '/block-preview-images/logos.png',
  'Text Section': '/block-preview-images/text-section.png',
  Testimonials: '/block-preview-images/testimonials.png',
}

export function getBlockPreviewImage(label: string): {
  imageURL: string
  imageAltText: string
} {
  const imageURL =
    PREVIEW_IMAGES[label] ??
    `https://placehold.co/${SIZE}/${BG}/${FG}?text=${label.replace(/\s+/g, '+')}`
  return {
    imageURL,
    imageAltText: `${label} block preview`,
  }
}
