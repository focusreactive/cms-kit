import { isAccessible } from './types'

export const admin: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && 'role' in user! && user.role === 'admin'
}
