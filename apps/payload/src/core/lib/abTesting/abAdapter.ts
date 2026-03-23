import { payloadGlobalAdapter } from '@focus-reactive/payload-plugin-ab/adapters/payload-global'
// import { vercelEdgeAdapter } from '@focus-reactive/payload-plugin-ab/adapters/vercel-edge'
import { ABVariantData } from './types'
import { getServerSideURL } from '../getURL'

export const abAdapter = payloadGlobalAdapter<ABVariantData>({
  serverURL: getServerSideURL(),
})

// export const abAdapter = vercelEdgeAdapter<ABVariantData>({
//   configID: process.env.EDGE_CONFIG_ID!,
//   configURL: process.env.EDGE_CONFIG!,
//   vercelRestAPIAccessToken: process.env.VERCEL_REST_API_ACCESS_TOKEN!,
//   teamID: process.env.VERCEL_TEAM_ID,
// })
