import type { ArrayField, Field } from "payload";

import deepMerge from "@/lib/utilities/deepMerge";

import { link } from "./link";

type LinkGroupType = (options?: { overrides?: Partial<ArrayField> }) => Field;

export const linkGroup: LinkGroupType = ({ overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: "links",
    type: "array",
    fields: [
      // TO-DO: add or delete overrides
      link({}),
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};
