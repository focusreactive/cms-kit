"use client";

import { createContext, useContext } from "react";

import type { IDataContextProviderProps, IDataContextValues } from "./types";

export const DataContext = createContext<IDataContextValues>({
  allResolvedLinks: [],
  globalComponentsStories: [],
});

export function DataContextProvider({
  children,
  allResolvedLinks,
  globalComponentsStories,
}: IDataContextProviderProps) {
  return (
    <DataContext.Provider
      value={{
        allResolvedLinks,
        globalComponentsStories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};
