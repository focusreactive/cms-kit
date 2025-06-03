import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/lib/api/client";
import { token } from "@/lib/token";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
