import { isAccessible } from './types'

export const user: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && 'role' in user! && user.role === 'user'
}
