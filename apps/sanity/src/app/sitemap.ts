import { type MetadataRoute } from "next";

import { generateSitemap } from "@/lib/loader/generateSitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await generateSitemap("page");
  const filteredPages = pages.filter(({ robots }) => robots === "index");

  const sitemap = filteredPages.map(({ slug, _createdAt }) => {
    const correctPath = slug.split("/").filter(Boolean);

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${correctPath.join("/")}`,
      lastModified: new Date(_createdAt),
    };
  });

  return sitemap;
}
