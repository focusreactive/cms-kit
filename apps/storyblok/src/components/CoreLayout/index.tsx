// import { fetchStoriesByParams, isDraftModeEnv } from "@/lib/api";
// import { fetchStories } from "@/lib/storyblok";
import { fetchStories } from "@/lib/storyblok";
import { DataContextProvider } from "@/components/DataContext";

import type { ICoreLayoutProps } from "./types";

export default async function CoreLayout({
  children,
  version,
  allResolvedLinks,
}: ICoreLayoutProps) {
  const {
    data: { stories: globalComponentsStories },
  } = await fetchStories(version, {
    by_slugs: "components/*",
  });

  return (
    <DataContextProvider
      globalComponentsStories={globalComponentsStories}
      allResolvedLinks={allResolvedLinks}
    >
      {children}
    </DataContextProvider>
  );
}
