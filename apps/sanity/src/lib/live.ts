import { defineLive } from "next-sanity";

import { client } from "./api/client";
import { token } from "./token";

export const { sanityFetch, SanityLive } = defineLive({
  client: client as any,
  browserToken: token,
  serverToken: token,
});
