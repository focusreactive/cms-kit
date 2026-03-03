export const TENANT_CONFIG = {
  enabled: true,
  defaultDomain: 'main',
} as const

// Store in globalThis to survive Next.js hot-reload (same pattern as Prisma client)
const globalForTenant = globalThis as unknown as { __defaultTenantId?: number }

export const isTenantEnabled = () => TENANT_CONFIG.enabled
export const getDefaultDomain = () => TENANT_CONFIG.defaultDomain

export const getDefaultTenantId = (): number => {
  if (globalForTenant.__defaultTenantId == null) {
    throw new Error('[TENANT CONFIG] Default tenant ID not resolved yet. onInit must run first.')
  }
  return globalForTenant.__defaultTenantId
}

export const setDefaultTenantId = (id: number) => {
  globalForTenant.__defaultTenantId = id
}

export const getTenantFilter = (tenantId?: number | string | null) => {
  if (!isTenantEnabled() || !tenantId) return {}
  return { tenant: { equals: tenantId } }
}
