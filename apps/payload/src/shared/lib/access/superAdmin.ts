import { isAccessible } from './types'

export const superAdmin: isAccessible<boolean> = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin'
}
