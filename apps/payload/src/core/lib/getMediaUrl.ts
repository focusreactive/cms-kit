import { getServerSideURL } from './getURL'

function normalizeHostname(hostname: string): string {
  if (hostname.includes('.localhost')) {
    return 'localhost'
  }
  return hostname
}

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('.localhost')) {
        urlObj.hostname = normalizeHostname(urlObj.hostname)
        url = urlObj.toString()
      }
    } catch {
      // skip
    }
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

  let finalBaseUrl = baseUrl

  if (!finalBaseUrl) {
    if (typeof window === 'undefined') {
      finalBaseUrl = getServerSideURL()
    } else {
      finalBaseUrl = ''
    }
  }

  return cacheTag ? `${finalBaseUrl}${url}?${cacheTag}` : `${finalBaseUrl}${url}`
}
