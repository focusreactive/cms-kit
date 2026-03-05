import { isAccessible } from './types'

export const createdBy: isAccessible = ({ req: { user } }) => {
  if (!user) return false

  return {
    createdBy: {
      equals: user.id,
    },
  }
}
