const REDIRECT_PATH_REGEX = /^[a-zA-Z0-9/\-_\.~]*$/
const REDIRECT_URL_REGEX = /^[a-zA-Z0-9/\-_\.~:%]*$/

export function validateRedirectPath(
  value: string | null | undefined,
  opts?: { allowUrl?: boolean },
): true | string {
  if (!value) return true
  const s = String(value).trim()
  if (s === '') return true
  if (/\s/.test(s)) {
    return 'Spaces are not allowed. Use only Latin letters, numbers, / - _ . ~ (and : % for full URLs).'
  }
  const re = opts?.allowUrl ? REDIRECT_URL_REGEX : REDIRECT_PATH_REGEX
  if (!re.test(s)) {
    return opts?.allowUrl
      ? 'Only Latin letters, numbers, / - _ . ~ : % are allowed. No spaces or other characters.'
      : 'Only Latin letters, numbers, and / - _ . ~ are allowed. No spaces or other characters.'
  }
  return true
}

export function normalizeRedirectPath(value: string | null | undefined): string {
  if (!value) return ''
  const s = String(value).trim().toLowerCase()
  if (s === '' || s === '/' || s === '/home') return '/'
  const path = s.startsWith('/') ? s : `/${s}`
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
}

export function normalizeRedirectToUrl(value: string | null | undefined): string {
  if (!value) return ''
  const s = String(value).trim()
  if (/^https?:\/\//i.test(s)) return s.toLowerCase()
  return normalizeRedirectPath(s)
}

export function canonicalRedirectFrom(url: string): string {
  return normalizeRedirectPath(url)
}
