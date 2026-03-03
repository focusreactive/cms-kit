import { googleAnalyticsAdapter } from '@kiryl.pekarski/payload-plugin-ab/analytics/adapters/google-analytics'

export const analyticsAdapter = googleAnalyticsAdapter({
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
})
