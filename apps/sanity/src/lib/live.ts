import { defineLive } from "next-sanity";

import config from "@/config";

import { client } from "./api/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: config.sanity.apiVersion }),
  browserToken: config.sanity.token,
  serverToken: config.sanity.token,
});
