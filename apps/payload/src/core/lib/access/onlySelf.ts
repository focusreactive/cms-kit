import { isAccessible } from './types'

export const onlySelf: isAccessible = ({ req: { user } }) => {
  if (!user) return false

  return {
    id: { equals: user.id },
  }
}
