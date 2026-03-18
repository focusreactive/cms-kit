import { User } from '@/payload-types'
import { FieldAccessArgs } from 'node_modules/payload/dist/fields/config/types'
import { AccessArgs, Where } from 'payload'

export type isAccessible<T extends boolean | Where = boolean | Where> = (
  args: AccessArgs<User> | FieldAccessArgs<User> | { req: { user: User; collection?: 'users' } },
) => T
