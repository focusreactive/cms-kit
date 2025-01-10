import "server-only";

import { groq } from "next-sanity";

import config from "@/config";
import { client } from "@/lib/api/client";

export async function generateStaticSlugs(type: string) {
  const slugs = await client
    .withConfig({
      token: config.sanity.token,
      perspective: "published",
      useCdn: false,
      stega: false,
    })
    .fetch<string[]>(
      groq`*[_type == $type && defined(pathname.current)]{"slug": pathname.current}.slug`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    );

  return slugs.map((slug) => ({ slug: slug.split("/").filter(Boolean) }));
}
