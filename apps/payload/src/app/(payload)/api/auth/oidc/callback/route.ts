import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import configPromise from '@payload-config'
import { createLocalReq, getPayload, getFieldsToSign, jwtSign } from 'payload'
import { addSessionToUser } from 'payload/shared'
import { getOIDCConfig } from '@/auth/oidc/config'
import { getDiscovery } from '@/auth/oidc/discovery'
import {
  claimsFromIdTokenPayload,
  claimsFromUserInfoResponse,
  type IdTokenPayload,
} from '@/auth/oidc/claims'
import { findOrCreateAdminUser } from '@/auth/utils/user'

const OAUTH_STATE_COOKIE = 'oidc_state'
const OAUTH_VERIFIER_COOKIE = 'oidc_code_verifier'

export async function GET(request: Request) {
  let payload
  try {
    payload = await getPayload({ config: configPromise })
    const config = getOIDCConfig()

    const url = new URL(request.url)
    const origin = url.origin

    if (!config) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('OIDC not configured')}`,
      )
    }

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const error = url.searchParams.get('error')
    const errorDescription = url.searchParams.get('error_description')

    if (error) {
      payload.logger.error({ err: error, errorDescription }, 'OIDC callback error')
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent(errorDescription || error)}`,
      )
    }

    if (!code) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('Authorization code not received')}`,
      )
    }

    const cookieStore = await cookies()
    const savedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value
    if (!state || !savedState || state !== savedState) {
      payload.logger.error('Invalid OIDC state')
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('Invalid state')}`,
      )
    }
    cookieStore.delete({ name: OAUTH_STATE_COOKIE, path: '/' })
    const codeVerifier = config.usePkce ? cookieStore.get(OAUTH_VERIFIER_COOKIE)?.value : undefined
    if (config.usePkce) cookieStore.delete({ name: OAUTH_VERIFIER_COOKIE, path: '/' })

    if (config.usePkce && !codeVerifier) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('code_verifier is missing')}`,
      )
    }

    const discovery = await getDiscovery(config.issuer)

    const tokenParams: Record<string, string> = {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    }
    if (codeVerifier) tokenParams.code_verifier = codeVerifier

    const tokenRes = await fetch(discovery.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(tokenParams),
    })

    const tokenData = await tokenRes.json()
    if (tokenData.error) {
      payload.logger.error('OIDC token error:', tokenData)
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent(tokenData.error_description || tokenData.error)}`,
      )
    }

    const idToken = tokenData.id_token as string | undefined
    const accessToken = tokenData.access_token as string | undefined

    let claims: { email: string; displayName: string }

    if (idToken) {
      const JWKS = createRemoteJWKSet(new URL(discovery.jwks_uri))
      const issuerOpts = [
        config.issuer,
        config.issuer.endsWith('/') ? config.issuer.slice(0, -1) : `${config.issuer}/`,
      ]
      let idPayload: IdTokenPayload | null = null
      for (const iss of issuerOpts) {
        try {
          const res = await jwtVerify(idToken, JWKS, {
            issuer: iss,
            audience: config.clientId,
          })
          idPayload = res.payload as IdTokenPayload
          break
        } catch {
          // try next issuer variant
        }
      }
      if (!idPayload) {
        throw new Error('id_token verification failed (issuer/audience mismatch)')
      }
      const raw = claimsFromIdTokenPayload(idPayload)
      if (!raw.email && discovery.userinfo_endpoint && accessToken) {
        const userInfoRes = await fetch(discovery.userinfo_endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (userInfoRes.ok) {
          const userInfo = await userInfoRes.json()
          const fromUserInfo = claimsFromUserInfoResponse(userInfo)
          raw.email = fromUserInfo.email
          raw.name = raw.name ?? fromUserInfo.name
        }
      }
      if (!raw.email) {
        return NextResponse.redirect(
          `${origin}/admin/login?error=${encodeURIComponent('Email not received from IdP')}`,
        )
      }
      claims = {
        email: raw.email,
        displayName: raw.name ?? raw.preferred_username ?? raw.email.split('@')[0],
      }
    } else if (discovery.userinfo_endpoint && accessToken) {
      const userInfoRes = await fetch(discovery.userinfo_endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!userInfoRes.ok) {
        return NextResponse.redirect(
          `${origin}/admin/login?error=${encodeURIComponent('Failed to get profile')}`,
        )
      }
      const userInfo = await userInfoRes.json()
      const raw = claimsFromUserInfoResponse(userInfo)
      if (!raw.email) {
        return NextResponse.redirect(
          `${origin}/admin/login?error=${encodeURIComponent('Email not received from IdP')}`,
        )
      }
      claims = {
        email: raw.email,
        displayName: raw.name ?? raw.preferred_username ?? raw.email.split('@')[0],
      }
    } else {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('No id_token and UserInfo')}`,
      )
    }

    const user = await findOrCreateAdminUser(payload, claims)

    const usersCollection = payload.collections.users.config
    if (!usersCollection?.auth) {
      throw new Error('Users collection auth config not found')
    }
    const secret = payload.secret
    if (!secret) {
      throw new Error('Payload secret not configured')
    }

    let sid: string | undefined
    if (usersCollection.auth.useSessions) {
      const req = await createLocalReq({}, payload)
      const session = await addSessionToUser({
        collectionConfig: usersCollection,
        payload,
        req,
        user: { ...user, collection: 'users' },
      })
      sid = session.sid
    }

    const fieldsToSign = getFieldsToSign({
      collectionConfig: usersCollection,
      email: user.email,
      sid,
      user: { ...user, collection: 'users' },
    })
    const tokenExpiration = usersCollection.auth.tokenExpiration ?? 7200
    const { token } = await jwtSign({
      fieldsToSign,
      secret,
      tokenExpiration,
    })

    const cookieName = `${payload.config.cookiePrefix ?? 'payload'}-token`
    const cookieOpts = usersCollection.auth.cookies ?? {}
    const isSecure = cookieOpts.secure ?? process.env.NODE_ENV === 'production'
    const sameSite =
      cookieOpts.sameSite === false
        ? 'lax'
        : ((cookieOpts.sameSite as 'lax' | 'strict' | 'none') ?? 'lax')

    const response = NextResponse.redirect(`${origin}/admin`)
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: isSecure,
      sameSite,
      maxAge: tokenExpiration,
      path: '/',
    })

    payload.logger.info(`User ${user.email} logged in via OIDC SSO`)
    return response
  } catch (err) {
    payload?.logger?.error({ err }, 'OIDC callback error')
    const msg = err instanceof Error ? err.message : 'Authentication error'
    const origin = new URL(request.url).origin
    return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(msg)}`)
  }
}
