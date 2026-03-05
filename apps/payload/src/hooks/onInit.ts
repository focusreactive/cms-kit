import { getDefaultDomain, setDefaultTenantId } from '@/shared/config/tenant'
import { Config } from 'payload'

export const onInit: Config['onInit'] = async (payload) => {
  const domain = getDefaultDomain()

  const existing = await payload.find({
    collection: 'tenants',
    where: { domain: { equals: domain } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    setDefaultTenantId(existing.docs[0].id as number)
    payload.logger.info(
      `[TENANT] Default tenant resolved (id: ${existing.docs[0].id}, domain: "${domain}")`,
    )
  } else {
    const created = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Default',
        domain,
      },
      context: { disableRevalidate: true },
    })
    setDefaultTenantId(created.id as number)
    payload.logger.info(
      `[TENANT SEED] Created default tenant (id: ${created.id}, domain: "${domain}")`,
    )
  }
}
