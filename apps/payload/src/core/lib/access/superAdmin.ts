import { isAccessible } from './types'

export const superAdmin: isAccessible<boolean> = ({ req: { user } }) => {
  if (!user) return false
  return 'role' in user && user.role === 'admin'
}
