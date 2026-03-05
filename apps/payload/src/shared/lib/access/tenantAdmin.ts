import { isAccessible } from './types'
import { isTenantEnabled } from '@/shared/config/tenant'

export const tenantAdmin: isAccessible<boolean> = ({ req: { user } }) => {
  if (!user) return false

  if (!isTenantEnabled()) {
    return user.role === 'admin'
  }

  if (user.role !== 'admin') return false
  return (Boolean(user.tenant) && user.role === 'admin') || user.role === 'admin'
}
