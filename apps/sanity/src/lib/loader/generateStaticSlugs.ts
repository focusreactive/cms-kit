import "server-only";

import { groq } from "next-sanity";

import { client } from "@/lib/api/client";
import { token } from "@/lib/token";

export async function generateStaticSlugs(type: string) {
  const slugs = await client
    .withConfig({
      token,
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
