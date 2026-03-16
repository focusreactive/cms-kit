import { isAccessible } from './types'

export const tenantAdmin: isAccessible<boolean> = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin'
}
