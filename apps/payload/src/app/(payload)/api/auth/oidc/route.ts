import { NextResponse } from 'next/server'
import { getOIDCConfig } from '@/auth/oidc/config'
import { getDiscovery } from '@/auth/oidc/discovery'
import { generatePKCE } from '@/auth/oidc/pkce'

/**
 * GET /api/auth/oidc
 * Start OIDC Authorization Code flow: state (+ PKCE), redirect to IdP.
 */
export async function GET(request: Request) {
  const config = getOIDCConfig()
  if (!config) {
    return NextResponse.json(
      {
        error:
          'OIDC not configured. Set OIDC_ISSUER, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET in environment variables.',
      },
      { status: 500 },
    )
  }

  try {
    const discovery = await getDiscovery(config.issuer)
    const state = crypto.randomUUID()

    const params: Record<string, string> = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scopes,
      state,
    }

    let codeVerifier: string | undefined
    if (config.usePkce) {
      const pkce = await generatePKCE()
      params.code_challenge = pkce.codeChallenge
      params.code_challenge_method = 'S256'
      codeVerifier = pkce.codeVerifier
    }

    const authUrl = `${discovery.authorization_endpoint}?${new URLSearchParams(params).toString()}`
    const response = NextResponse.redirect(authUrl)

    const isSecure = process.env.NODE_ENV === 'production'
    response.cookies.set('oidc_state', state, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 600,
      path: '/',
    })
    if (codeVerifier) {
      response.cookies.set('oidc_code_verifier', codeVerifier, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 600,
        path: '/',
      })
    }

    return response
  } catch (error) {
    console.error('OIDC start error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'OIDC start failed' },
      { status: 500 },
    )
  }
}
