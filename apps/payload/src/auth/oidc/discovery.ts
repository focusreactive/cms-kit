/**
 * OIDC Discovery: loading and caching /.well-known/openid-configuration
 */
export interface OIDCDiscovery {
  authorization_endpoint: string
  token_endpoint: string
  userinfo_endpoint?: string
  jwks_uri: string
  issuer: string
}

const cache = new Map<string, { doc: OIDCDiscovery; expiresAt: number }>()
const TTL_MS = 60 * 60 * 1000 // 1 hour

function discoveryUrl(issuer: string): string {
  const base = issuer.replace(/\/$/, '')
  return `${base}/.well-known/openid-configuration`
}

export async function getDiscovery(issuer: string): Promise<OIDCDiscovery> {
  const url = discoveryUrl(issuer)
  const cached = cache.get(url)
  if (cached && cached.expiresAt > Date.now()) return cached.doc

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error(`OIDC discovery failed: ${res.status} ${res.statusText}`)
  }
  const doc = (await res.json()) as OIDCDiscovery
  if (!doc.authorization_endpoint || !doc.token_endpoint || !doc.jwks_uri) {
    throw new Error('Invalid OIDC discovery: missing required endpoints')
  }
  cache.set(url, { doc, expiresAt: Date.now() + TTL_MS })
  return doc
}
