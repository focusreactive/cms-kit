import "server-only";

import { groq } from "next-sanity";

import { client } from "@/lib/api/client";

import config from "../../config";

// TODO: @dogfrogfog
// rework to be simple reusable query
// no need to create generateSitemapFile
export function generateSitemap(type: string) {
  return client
    .withConfig({
      token: config.sanity.token,
      perspective: "published",
      useCdn: false,
      stega: false,
    })
    .fetch<{ slug: string; _createdAt: string; robots: string }[]>(
      groq`*[_type == $type && defined(pathname.current)] {
        "slug": pathname.current,
        _createdAt,
        robots,
      }`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    );
}
