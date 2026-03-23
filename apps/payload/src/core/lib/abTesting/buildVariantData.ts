import type { Page } from '@/payload-types'
import type { ABVariantData } from './types'
import { I18N_CONFIG } from '@/core/config/i18n'

export function buildVariantData(
  doc: Page & { _abPassPercentage?: number },
  locale: string | undefined,
): ABVariantData {
  const breadcrumbs = doc.breadcrumbs ?? []
  const lastUrl = breadcrumbs[breadcrumbs.length - 1]?.url ?? ''
  const restPath = !lastUrl || lastUrl === '/home' ? '' : lastUrl
  const resolvedLocale = locale ?? I18N_CONFIG.defaultLocale

  return {
    bucket: doc.slug,
    rewritePath: `/${resolvedLocale}${restPath}`,
    passPercentage: doc._abPassPercentage ?? 0,
  }
}
