import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'
import type { Page } from '@/payload-types'
import { getDomainFromGlobalDoc } from '@/shared/lib/getGlobals'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/shared/lib/revalidatePageCache'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload, context } = req
  const locale = getLocaleFromRequest(req)
  const domain = await getDomainFromGlobalDoc(doc)

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePageCache({ doc, domain, locale, payload })
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const prevDomain = await getDomainFromGlobalDoc(previousDoc)
      revalidatePageCache({ doc: previousDoc, domain: prevDomain, locale, payload })
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc, req }) => {
  const { payload, context } = req
  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    const domain = await getDomainFromGlobalDoc(doc)
    revalidatePageCache({ doc, domain, locale, payload })
  }
  return doc
}
