import { isAccessible } from './types'

export const author: isAccessible = ({ req: { user } }) => {
  return Boolean(user) && user?.role === 'author'
}
