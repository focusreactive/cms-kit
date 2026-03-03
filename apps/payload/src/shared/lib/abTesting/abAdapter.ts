// import { payloadGlobalAdapter } from 'payload-plugin-ab'
import { vercelEdgeAdapter } from '@kiryl.pekarski/payload-plugin-ab/adapters/vercel-edge'
import { ABVariantData } from './types'

// export const abAdapter = payloadGlobalAdapter<ABVariantData>({
//   serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
// })

export const abAdapter = vercelEdgeAdapter<ABVariantData>({
  configID: process.env.EDGE_CONFIG_ID!,
  configURL: process.env.EDGE_CONFIG!,
  vercelRestAPIAccessToken: process.env.VERCEL_REST_API_ACCESS_TOKEN!,
  teamID: process.env.VERCEL_TEAM_ID,
})
