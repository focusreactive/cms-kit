import { isAccessible } from './types'

export const author: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && 'role' in user! && user.role === 'author'
}
