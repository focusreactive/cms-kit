import type { ISbStoryData } from "@storyblok/react/rsc";

import type { IResolvedLink } from "@/lib/api";

export interface IDataContextValues {
  allResolvedLinks: IResolvedLink[];
  globalComponentsStories: ISbStoryData[];
}

export interface IDataContextProviderProps extends IDataContextValues {
  children: React.ReactNode;
}
