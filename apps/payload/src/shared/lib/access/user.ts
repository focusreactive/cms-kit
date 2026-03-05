import { isAccessible } from './types'

export const user: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && user?.role === 'user'
}
