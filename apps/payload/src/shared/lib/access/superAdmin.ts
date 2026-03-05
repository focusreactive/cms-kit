import { isAccessible } from './types'

export const superAdmin: isAccessible<boolean> = ({ req: { user } }) => {
  if (!user) return false
  if (user.role !== 'admin') return false

  return !user.tenant
}
