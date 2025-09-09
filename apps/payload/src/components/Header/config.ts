import type { GlobalConfig } from "payload";

import { ImageAspectRatio } from "@/lib/sharedTypes";
import { link } from "@/components/fields/link";

import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "image",
              type: "group",
              label: "Image",
              required: true,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "aspectRatio",
                  type: "select",
                  defaultValue: "1/1",
                  label: "Aspect Ratio",
                  required: true,
                  options: Object.values(ImageAspectRatio).map(
                    (aspectRatio) => ({
                      label: aspectRatio,
                      value: aspectRatio,
                    }),
                  ),
                },
              ],
            },
            {
              name: "links",
              type: "array",
              fields: [link({})],
              // maxRows: 6, // TO-DO: Is there a need for a limit on the number of links?
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: "@/components/Header/RowLabel#RowLabel",
                },
              },
            },
          ],
        },
        {
          label: "Style",
          fields: [
            {
              name: "alignVariant",
              type: "select",
              defaultValue: "right",
              label: "Align Variant",
              required: true,
              options: [
                {
                  label: "left",
                  value: "left",
                },
                {
                  label: "center",
                  value: "center",
                },
                {
                  label: "right",
                  value: "right",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
