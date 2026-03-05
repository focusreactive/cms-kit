/**
 * PKCE: code_verifier и code_challenge для Authorization Code flow
 */
function base64UrlEncode(bytes: Uint8Array): string {
  const b64 = Buffer.from(bytes).toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function generatePKCE(): Promise<{
  codeVerifier: string
  codeChallenge: string
}> {
  const verifier = crypto.getRandomValues(new Uint8Array(32))
  const codeVerifier = base64UrlEncode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier))
  const codeChallenge = base64UrlEncode(new Uint8Array(digest))
  return { codeVerifier, codeChallenge }
}
