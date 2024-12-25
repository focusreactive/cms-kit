import "server-only";

import { draftMode } from "next/headers";
import * as queryStore from "@sanity/react-loader";

import config from "@/config";
import { client } from "@/lib/api/client";
import { PAGE_BY_SLUG_QUERY } from "@/lib/api/queries";

const serverClient = client.withConfig({
  token: config.sanity.token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === "preview",
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export async function loadQuery(
  query: string,
  params = {} as any,
  options = {} as any,
): Promise<any> {
  const isDev = process.env.NODE_ENV === "development";
  const {
    perspective = (await draftMode()).isEnabled || isDev
      ? "previewDrafts"
      : "published",
  } = options;
  // Don't cache by default
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: (await draftMode()).isEnabled,
  });
}

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export async function loadPage(slug: string) {
  return await loadQuery(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  );
}
