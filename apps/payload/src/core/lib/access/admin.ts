import { isAccessible } from './types'

export const admin: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && user?.role === 'admin'
}
