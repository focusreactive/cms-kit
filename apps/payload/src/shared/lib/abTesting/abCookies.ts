import { AbCookieConfig } from '@kiryl.pekarski/payload-plugin-ab'
import { manifestKeyToExpCookieName } from './cookieName'

export const abCookies: AbCookieConfig = {
  visitorIdCookieName: 'ab_visitor_id',
  getExpCookieName: manifestKeyToExpCookieName,
}
