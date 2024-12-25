import type { Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { type ISbStoriesParams, type ISbStoryData } from "@storyblok/react/rsc";

import { SB_CACHE_VERSION_TAG } from "@/constants/cacheTags";

const API_GATE = process.env.NEXT_PUBLIC_API_GATE;
const isDevMode = process.env.NODE_ENV === "development";
export const isDraftModeEnv =
  process.env.NEXT_PUBLIC_IS_PREVIEW === "true" || isDevMode;

// Get the actual SB cache version
export const getSBcacheCVparameter = async (isDraftMode: boolean) => {
  const searchParamsData: ISbStoriesParams = {
    token: process.env.SB_PREVIEW_TOKEN,
    version: isDraftMode ? "draft" : "published",
  };

  const searchParams = new URLSearchParams(
    searchParamsData as Record<string, string>,
  );

  const { cv: cacheVersion } = await fetch(
    `${API_GATE}/stories?${searchParams.toString()}`,
    {
      next: {
        tags: [SB_CACHE_VERSION_TAG],
        ...(isDraftMode
          ? {
              revalidate: 0,
            }
          : {}),
      },
    },
  ).then((res) => res.json());

  return cacheVersion;
};

export interface IResolvedLink {
  name: string;
  id: number;
  uuid: string;
  slug: string;
  url: string;
  full_slug: string;
}

// The main function to fetch a story by slug
// Next.js data cache enabled
export async function fetchStoryBySlug(
  isDraftMode: boolean,
  slug: string[] = ["home"],
  params?: { cv?: number },
): Promise<{ story: ISbStoryData; links: IResolvedLink[] }> {
  const cv = await getSBcacheCVparameter(isDraftMode);

  const contentVersion = isDraftMode ? "draft" : "published";

  const searchParamsData: ISbStoriesParams = {
    token: process.env.SB_PREVIEW_TOKEN,
    cv,
    version: contentVersion,
    ...params,
    resolve_links: "url",
  };

  const searchParams = new URLSearchParams(
    searchParamsData as Record<string, string>,
  );

  const { story, links } = await fetch(
    `${API_GATE}/stories/${slug?.join("/") || ""}?${searchParams.toString()}`,
  ).then((res) => res.json());

  console.log("links length: ", links.length);

  return {
    story,
    links,
  };
}

// This function uses only on a build lvl to generate a sitemap
export async function fetchAllPages() {
  const cv = await getSBcacheCVparameter(false);

  const commonFetchParams: ISbStoriesParams = {
    version: "published",
    token: process.env.SB_PREVIEW_TOKEN,
    cv,
    per_page: 1000,
    // @ts-ignore
    include_dates: "1",
  };

  const searchParams = new URLSearchParams(
    commonFetchParams as Record<string, string>,
  );

  const linksResponse = await fetch(
    `${API_GATE}/links?${searchParams.toString()}`,
  );

  const pagesData = await linksResponse.json();
  const total = Number(linksResponse.headers.get("Total"));
  const lastPageNumber = Math.ceil(total / 1000);

  let pages: { slug: string; is_folder: boolean; published_at: string }[] =
    Object.values(pagesData.links);

  for (let i = 2; i <= lastPageNumber; i++) {
    const paginatedLinksResponse = await fetch(
      `${API_GATE}/links?${searchParams.toString()}&page=${i}`,
    );

    const paginatedLinksData = await paginatedLinksResponse.json();

    pages = pages.concat(Object.values(paginatedLinksData.links));
  }

  return pages;
}

// Fetch stories by params
// Next.js data cache enabled
export async function fetchStoriesByParams(
  isDraftModeEnabled: boolean,
  params?: ISbStoriesParams,
): Promise<{ data: ISbStoryData[]; headers: Headers }> {
  const contentVersion = isDraftModeEnabled ? "draft" : "published";
  const cv = await getSBcacheCVparameter(isDraftModeEnabled);

  const searchParamsData: ISbStoriesParams = {
    token: process.env.SB_PREVIEW_TOKEN,
    cv,
    version: contentVersion,
    ...params,
  };

  const searchParams = new URLSearchParams(
    searchParamsData as Record<string, string>,
  );

  try {
    const response = await fetch(
      `${API_GATE}/stories?${searchParams.toString()}`,
    );

    const data = await response.json();

    return { data: data.stories, headers: response.headers };
  } catch (error) {
    throw error;
  }
}

// Check if the draft mode token is valid
export async function checkDraftModeToken(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  if (isDevMode) return true;

  let isDraftModeEnabled = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";

  if (isDraftModeEnabled && process.env.NODE_ENV !== "development") {
    isDraftModeEnabled = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/checkToken?space_id=${searchParams?.["_storyblok_tk[space_id]"]}&timestamp=${searchParams?.["_storyblok_tk[timestamp]"]}&token=${searchParams?.["_storyblok_tk[token]"]}`,
    )
      .then((res) => res.json())
      .then((res) => res.result);
  }

  return isDraftModeEnabled;
}

export async function getMetaData(slug?: string[]): Promise<Metadata> {
  const isDraftModeEnabled = isDraftModeEnv;

  const { story } = await fetchStoryBySlug(isDraftModeEnabled, slug);

  if (!story) {
    console.log(`missing metadata for story: ${slug?.join("/")}`);
    return {};
  }

  const openGraph: OpenGraph = {
    title: story.content.seoTitle || story.name || "",
    description: story.content.seoDescription || "",
  };

  openGraph.images = {
    url: story.content?.ogImage?.filename
      ? `${story.content?.ogImage?.filename}/m/1200x630/filters:quality(75)`
      : "",
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
}
