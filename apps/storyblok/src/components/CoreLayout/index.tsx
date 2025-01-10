// import { fetchStoriesByParams, isDraftModeEnv } from "@/lib/api";
// import { fetchStories } from "@/lib/storyblok";
import { DataContextProvider } from "@/components/DataContext";

import type { ICoreLayoutProps } from "./types";

export default async function CoreLayout({
  children,
  allResolvedLinks,
}: ICoreLayoutProps) {
  // const { data } = await fetchStoriesByParams(isDraftModeEnv, {
  //   by_slugs: "components/*",
  // });

  // let globalComponentsStories: ISbStoryData[] = [];
  // const { stories } = await fetchStories({
  //   by_slugs: "components/*",
  // });

  // globalComponentsStories = stories;

  const data = [] as any;

  return (
    <DataContextProvider
      globalComponentsStories={data}
      allResolvedLinks={allResolvedLinks}
    >
      {children}
    </DataContextProvider>
  );
}
