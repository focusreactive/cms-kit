"use client";

import React, { createContext, useContext } from "react";
import type { BlocksFieldClient, SanitizedFieldPermissions } from "payload";

export interface BeforeOpenDrawerInfo {
  field: Omit<BlocksFieldClient, "type"> &
    Partial<Pick<BlocksFieldClient, "type">>;
  path: string;
  schemaPath: string;
  readOnly: boolean;
  permissions?: SanitizedFieldPermissions;
  /** Current blocks data for this field */
  blocksData: unknown[];
  /** Full form data */
  formData: Record<string, unknown>;
}

/**
 * Callback that runs before the "Add block with preset" drawer opens.
 * Receives field info for validation.
 * Return `true` (or resolve to `true`) to allow the drawer to open.
 * Return `false` to prevent it.
 */
export type BeforeOpenDrawerFn = (
  info: BeforeOpenDrawerInfo,
) => boolean | Promise<boolean>;

interface BeforeOpenDrawerContextValue {
  beforeOpenDrawer?: BeforeOpenDrawerFn;
}

const BeforeOpenDrawerContext = createContext<BeforeOpenDrawerContextValue>({});

export const BeforeOpenDrawerProvider: React.FC<{
  beforeOpenDrawer: BeforeOpenDrawerFn;
  children: React.ReactNode;
}> = ({ beforeOpenDrawer, children }) => {
  return (
    <BeforeOpenDrawerContext.Provider value={{ beforeOpenDrawer }}>
      {children}
    </BeforeOpenDrawerContext.Provider>
  );
};

export function useBeforeOpenDrawer(): BeforeOpenDrawerFn | undefined {
  return useContext(BeforeOpenDrawerContext).beforeOpenDrawer;
}
