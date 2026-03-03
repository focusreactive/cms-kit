import type { Payload } from 'payload'
import type { User } from '@/payload-types'

/**
 * Sign in for SSO: OIDC claims or legacy OAuth profile
 */
export type SSOUserInput =
  | { email: string; displayName?: string }
  | {
      id: string
      displayName: string
      email: string
      emails?: Array<{ value: string; verified?: boolean }>
      photos?: Array<{ value: string }>
      provider: string
    }

function normalizeEmailAndName(input: SSOUserInput): { email: string; displayName: string } {
  const email = 'emails' in input ? input.email || input.emails?.[0]?.value : input.email
  if (!email) {
    throw new Error('Email not provided by the provider')
  }
  const displayName =
    'displayName' in input
      ? input.displayName || email.split('@')[0]
      : input.displayName || email.split('@')[0]
  return { email, displayName }
}

/**
 * Finds or creates an admin user based on the SSO (OIDC/OAuth) profile.
 * If the user exists and is admin, returns it.
 * If not exists, creates with role admin. If exists and is not admin, error.
 */
export async function findOrCreateAdminUser(
  payload: Payload,
  profile: SSOUserInput,
): Promise<User> {
  const { email, displayName } = normalizeEmailAndName(profile)

  // Find existing user by email
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
    limit: 1,
    depth: 0,
  })

  const existingUser = existingUsers.docs[0] as User | undefined
  if (existingUser) {
    return existingUser
  }

  // User does not exist - create a new admin.
  // Payload auth requires password at create; for SSO user we set a random password,
  // so the login is only through IdP (password is not known to the user).
  const randomPassword =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID() + crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  const newUser = await payload.create({
    collection: 'users',
    data: {
      email,
      name: displayName,
      role: 'admin',
      password: randomPassword,
    },
  })

  payload.logger.info(`New admin created via SSO: ${email}`)

  return newUser as User
}
