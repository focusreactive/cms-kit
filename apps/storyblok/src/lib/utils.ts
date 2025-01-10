import { SB_CACHE_VERSION_TAG } from "@/constants/cacheTags";

export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";

export async function fetcher(slug: string, params: Record<string, unknown>) {
  try {
    const now = performance.now();
    const response = await fetch(slug, params);
    const end = performance.now();

    console.log("fetcher execution time: ", (end - now).toFixed(2));
    console.log(response.status, response.statusText);

    return {
      data: await response.json(),
      headers: response.headers,
    };
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw error;
  }
}

export function getNextCachingParams(version: "draft" | "published") {
  return {
    next: { tags: [SB_CACHE_VERSION_TAG] },
    cache: version === "published" ? "default" : "no-store",
  };
}
