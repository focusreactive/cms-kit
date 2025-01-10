import type { MetadataRoute } from "next";
import type { ISbStoriesParams, ISbStoryData } from "@storyblok/react/rsc";

import { fetchStories } from "@/lib/storyblok";

const storiesPerPageSize = 1;

const version =
  process.env.NEXT_PUBLIC_IS_PREVIEW === "true" ? "draft" : "published";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const commonFetchParams: ISbStoriesParams = {
    per_page: storiesPerPageSize,
    content_type: "page",
  };

  const {
    data: { stories: firstPageStories },
    headers,
  } = await fetchStories(version, commonFetchParams);

  const total = Number(headers.get("Total"));
  const lastPageNumber = Math.ceil(total / storiesPerPageSize);
  const pagesPromises: ReturnType<typeof fetchStories>[] = [];

  for (let i = 2; i <= lastPageNumber; i++) {
    const promise = fetchStories(version, {
      ...commonFetchParams,
      page: i,
    });

    pagesPromises.push(promise);
  }

  const storiesRequestData = await Promise.all(pagesPromises);

  const otherPagesStories = storiesRequestData.flatMap((r) => r.data.stories);
  const allPagesStories = firstPageStories.concat(
    otherPagesStories,
  ) as ISbStoryData[];

  const filteredStories = allPagesStories.filter((s) => {
    if (s.is_folder) {
      return false;
    }

    if (s.content.robots === "no-index") {
      return false;
    }

    return true;
  });

  const sitemap = filteredStories.map((page) => {
    const correctPath = page.full_slug.split("/").filter(Boolean);

    return {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/${correctPath.join("/")}`,
      lastModified: new Date(page.published_at as string),
    };
  });

  return sitemap;
}
