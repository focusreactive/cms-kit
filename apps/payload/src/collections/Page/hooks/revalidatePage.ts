import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Page } from '@/payload-types'
import { getLocaleFromRequest } from '@/core/lib/getLocaleFromRequest'
import { revalidatePageCache } from '@/core/lib/revalidatePageCache'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload, context } = req
  const locale = getLocaleFromRequest(req)

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePageCache({ doc, locale, payload })
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePageCache({ doc: previousDoc, locale, payload })
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc, req }) => {
  const { payload, context } = req
  if (!context.disableRevalidate) {
    const locale = getLocaleFromRequest(req)
    revalidatePageCache({ doc, locale, payload })
  }
  return doc
}
