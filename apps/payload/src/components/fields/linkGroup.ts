import type { ArrayField, Field } from "payload";

import deepMerge from "@/lib/utilities/deepMerge";

// import type { LinkAppearances } from "./link";
import { link } from "./link";

type LinkGroupType = (options?: {
  // appearances?: LinkAppearances[] | false;
  overrides?: Partial<ArrayField>;
}) => Field;

export const linkGroup: LinkGroupType = ({
  // appearances,
  overrides = {},
} = {}) => {
  const generatedLinkGroup: Field = {
    name: "links",
    type: "array",
    fields: [
      link({}),
      // link({
      //   appearances,
      //   overrides
      // }),
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};
