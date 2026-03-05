/**
 * OIDC configuration from env.
 * Used by routes /api/auth/oidc and /api/auth/oidc/callback.
 */
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  if (url) return url.replace(/\/$/, '')
  return ''
}

export interface OIDCConfig {
  issuer: string
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string
  usePkce: boolean
  providerName: string
}

export function getOIDCConfig(): OIDCConfig | null {
  const issuer = process.env.OIDC_ISSUER?.replace(/\/$/, '')
  const clientId = process.env.OIDC_CLIENT_ID
  const clientSecret = process.env.OIDC_CLIENT_SECRET

  if (!issuer || !clientId || !clientSecret) return null

  const baseUrl = getBaseUrl()
  const redirectUri =
    process.env.OIDC_REDIRECT_URI || (baseUrl ? `${baseUrl}/api/auth/oidc/callback` : '')

  if (!redirectUri) return null

  return {
    issuer,
    clientId,
    clientSecret,
    redirectUri,
    scopes: process.env.OIDC_SCOPES || 'openid profile email',
    usePkce: process.env.OIDC_USE_PKCE === 'true',
    providerName: process.env.OIDC_PROVIDER_NAME || 'SSO',
  }
}

export function isOIDCEnabled(): boolean {
  return getOIDCConfig() !== null
}
