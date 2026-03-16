import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'
import type { Page } from '@/payload-types'
import { getLocaleFromRequest } from '@/shared/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/shared/lib/revalidatePageCache'

const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'main'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload, context } = req
  const locale = getLocaleFromRequest(req)

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePageCache({ doc, domain: DEFAULT_DOMAIN, locale, payload })
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePageCache({ doc: previousDoc, domain: DEFAULT_DOMAIN, locale, payload })
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc, req }) => {
  const { payload, context } = req
  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    revalidatePageCache({ doc, domain: DEFAULT_DOMAIN, locale, payload })
  }
  return doc
}
