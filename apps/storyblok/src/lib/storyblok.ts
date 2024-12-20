import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import {
  apiPlugin,
  storyblokInit,
  type ISbStoriesParams,
} from "@storyblok/react/rsc";

import { SB_CACHE_VERSION_TAG } from "@/constants/cacheTags";
import { COMPONENTS } from "@/constants/sbComponents";

const CONTENT_VERSION = process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_VERSION as
  | "published"
  | "draft";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: COMPONENTS,
}) as any;

export async function fetchStory(slug?: string[]) {
  try {
    const storyblokApi = getStoryblokApi();
    const sbParams: ISbStoriesParams = {
      version: CONTENT_VERSION,
      resolve_links: "url",
    };

    const cleanSlug =
      slug?.filter(Boolean).filter((v) => v !== "undefined") || [];

    const { data } = await storyblokApi.get(
      `cdn/stories/${cleanSlug.length > 0 ? cleanSlug.join("/") : "home"}`,
      sbParams,
      {
        next: {
          tags: [SB_CACHE_VERSION_TAG],
        },
      },
    );

    return data;
  } catch (error) {
    console.log("error fetching story ❌", error);
    return { story: null };
  }
}

export async function fetchStories(params?: ISbStoriesParams) {
  try {
    const storyblokApi = getStoryblokApi();
    const sbParams: ISbStoriesParams = {
      version: CONTENT_VERSION,
      ...params,
    };

    const start = performance.now();
    const { data, total } = await storyblokApi.get("cdn/stories", sbParams, {
      next: {
        tags: [SB_CACHE_VERSION_TAG],
      },
    });
    const end = performance.now();
    console.log(`🕰️ fetchStories execute time: ${(end - start).toFixed(3)}ms`);

    return { ...data, total };
  } catch (error) {
    console.log("error fetching stories ❌", error);
    return { stories: null, total: 0 };
  }
}

export async function fetchStoryMetadata(slug: string[]) {
  try {
    const { story } = await fetchStory(slug);

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

    const storyFullSlug = story.full_slug === "home" ? "" : story.full_slug;

    const canonical = new URL(
      `${process.env.NEXT_PUBLIC_DOMAIN as string}/${storyFullSlug}`,
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
  } catch (error) {
    console.log("error fetching story metadata ❌", error);
    return {};
  }
}

export async function fetchAllPages() {
  try {
    const storyblokApi = getStoryblokApi();
    const commonSbParams: ISbStoriesParams = {
      version: CONTENT_VERSION,
      per_page: 1000,
      // @ts-ignore
      include_dates: "1",
    };

    const { data, total } = await storyblokApi.get("cdn/links", commonSbParams);
    const lastPageNumber = Math.ceil(total / 1000);

    let pages: { slug: string; is_folder: boolean; published_at: string }[] =
      Object.values(data.links);

    for (let i = 2; i <= lastPageNumber; i++) {
      const { data } = await storyblokApi.get(
        "cdn/links",
        {
          ...commonSbParams,
          page: i,
        },
        {
          next: {
            tags: [SB_CACHE_VERSION_TAG],
          },
        },
      );

      pages = pages.concat(data.links);
    }

    const filteredPages = pages.filter((p) => !p.slug.startsWith("components"));

    return filteredPages;
  } catch (error) {
    console.log("error fetching all pages ❌", error);
    return [];
  }
}
