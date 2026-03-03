export const DOMAIN_MAX_LENGTH = 63
const DOMAIN_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$|^[a-z0-9]$/

export function normalizeDomain(value: string | undefined | null): string {
  if (!value || typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, '-').toLowerCase()
}

export function validateDomain(value: string | undefined | null): true | string {
  if (!value) {
    return 'Domain is required'
  }
  const normalized = normalizeDomain(value)
  if (normalized.length > DOMAIN_MAX_LENGTH) {
    return `Domain must be at most ${DOMAIN_MAX_LENGTH} characters`
  }
  if (!DOMAIN_PATTERN.test(normalized)) {
    return 'Domain must contain only Latin letters (a-z), numbers (0-9) and hyphens; cannot start or end with a hyphen'
  }
  return true
}
