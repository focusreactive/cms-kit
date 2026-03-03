/**
 * Extraction of claims from id_token (JWT payload) or from UserInfo response.
 * Standard OIDC claims: sub, email, name, preferred_username, picture.
 */
export interface OIDCUserClaims {
  sub: string
  email: string | null
  name: string | null
  preferred_username?: string | null
  picture?: string | null
}

export interface IdTokenPayload {
  sub?: string
  email?: string
  name?: string
  preferred_username?: string
  picture?: string
  [key: string]: unknown
}

export function claimsFromIdTokenPayload(payload: IdTokenPayload): OIDCUserClaims {
  const email = payload.email ?? (Array.isArray(payload.emails) ? payload.emails[0] : null)
  const emailStr =
    typeof email === 'string' ? email : ((email as { value?: string })?.value ?? null)
  return {
    sub: payload.sub ?? '',
    email: emailStr,
    name: payload.name ?? payload.preferred_username ?? null,
    preferred_username: payload.preferred_username ?? null,
    picture: typeof payload.picture === 'string' ? payload.picture : null,
  }
}

export function claimsFromUserInfoResponse(body: Record<string, unknown>): OIDCUserClaims {
  const email =
    body.email ??
    (Array.isArray(body.emails) ? (body.emails[0] as { value?: string })?.value : null)
  return {
    sub: (body.sub as string) ?? '',
    email: typeof email === 'string' ? email : null,
    name: (body.name as string) ?? (body.preferred_username as string) ?? null,
    preferred_username: (body.preferred_username as string) ?? null,
    picture: typeof body.picture === 'string' ? body.picture : null,
  }
}
