import { defineEnableDraftMode } from "next-sanity/draft-mode";

import config from "@/config";
import { client } from "@/lib/api/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: config.sanity.token }),
});
