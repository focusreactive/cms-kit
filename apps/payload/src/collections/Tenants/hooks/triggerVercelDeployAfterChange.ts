import type { CollectionAfterChangeHook } from 'payload'
import { Tenant } from '@/payload-types'
import { triggerVercelDeploy } from '@/shared/lib/deployment/triggerVercelDeploy'

export const triggerVercelDeployAfterChange: CollectionAfterChangeHook<Tenant> = async ({
  doc,
  previousDoc,
}) => {
  const domainChanged = previousDoc && previousDoc.domain !== doc.domain

  if (domainChanged) {
    triggerVercelDeploy()
  }

  return doc
}
