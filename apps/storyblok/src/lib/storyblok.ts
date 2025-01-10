import type { Metadata } from "next";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import { COMPONENTS } from "@/constants/sbComponents";

import { fetcher, getNextCachingParams } from "./utils";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: COMPONENTS,
}) as any;

export async function fetchStory(
  version: "draft" | "published",
  slug?: string[],
) {
  getStoryblokApi();
  const correctSlug = `/${slug ? slug.join("/") : "home"}`;

  const searchParams = new URLSearchParams({
    version,
    token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
  });

  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_STORYBLOK_API_GATE}/stories${correctSlug}?${searchParams.toString()}`,
    {
      method: "GET",
      ...getNextCachingParams(version),
    },
  );

  return data;
}

export async function fetchStories(
  version: "draft" | "published",
  params?: any,
) {
  getStoryblokApi();

  const searchParams = new URLSearchParams({
    version,
    token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
    ...params,
  });

  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_STORYBLOK_API_GATE}/stories?${searchParams.toString()}`,
    {
      method: "GET",
      ...getNextCachingParams(version),
    },
  );

  return data;
}

export async function fetchStoryMetadata(
  version: "draft" | "published",
  slug?: string[],
) {
  const {
    data: { story },
  } = await fetchStory(version, slug);

  if (!story) {
    console.log(`missing metadata for story: ${slug?.join("/")}`);
    return {};
  }

  const openGraph: Metadata["openGraph"] = {
    title: story.content.seoTitle || story.name || "",
    description: story.content.seoDescription || "",
    images: [
      {
        url: story.content?.ogImage?.filename
          ? `${story.content?.ogImage?.filename}/m/1200x630/filters:quality(75)`
          : "",
      },
    ],
  };

  const correctSlug = story.full_slug === "home" ? "" : story.full_slug;
  const canonical = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN as string}/${correctSlug}`,
  ).toString();

  return {
    alternates: {
      canonical,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string),
    title: story.content.seoTitle || story.name || "",
    description: story.content.seoDescription || "",
    openGraph,
    keywords: story.content?.seoKeywords || "",
    robots:
      story?.content?.robots === "index" ? { index: true } : { index: false },
  };
}

export async function fetchAllPages() {
  throw new Error("test");

  // try {
  //   const storyblokApi = getStoryblokApi();
  //   const commonSbParams: ISbStoriesParams = {
  //     version: CONTENT_VERSION,
  //     per_page: 1000,
  //     // @ts-ignore
  //     include_dates: "1",
  //   };

  //   const { data, total } = await storyblokApi.get("cdn/links", commonSbParams);
  //   const lastPageNumber = Math.ceil(total / 1000);

  //   let pages: { slug: string; is_folder: boolean; published_at: string }[] =
  //     Object.values(data.links);

  //   for (let i = 2; i <= lastPageNumber; i++) {
  //     const { data } = await storyblokApi.get(
  //       "cdn/links",
  //       {
  //         ...commonSbParams,
  //         page: i,
  //       },
  //       {
  //         next: {
  //           tags: [SB_CACHE_VERSION_TAG],
  //         },
  //       },
  //     );

  //     pages = pages.concat(data.links);
  //   }

  //   const filteredPages = pages.filter((p) => !p.slug.startsWith("components"));

  //   return filteredPages;
  // } catch (error) {
  //   console.log("error fetching all pages ❌", error);
  //   return [];
  // }
}
