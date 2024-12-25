import { fetchStoriesByParams, isDraftModeEnv } from "@/lib/api";
import { DataContextProvider } from "@/components/DataContext";
import StoryblokProvider from "@/components/StoryblokProvider";

import type { ICoreLayoutProps } from "./types";

export default async function CoreLayout({
  children,
  allResolvedLinks,
}: ICoreLayoutProps) {
  const { data } = await fetchStoriesByParams(isDraftModeEnv, {
    by_slugs: "components/*",
  });

  return (
    <StoryblokProvider>
      <DataContextProvider
        globalComponentsStories={data}
        allResolvedLinks={allResolvedLinks}
      >
        {children}
      </DataContextProvider>
    </StoryblokProvider>
  );
}
