// import { ImageAspectRatio } from "@shared/ui/components/ui/image/types";
import type { GlobalConfig } from "payload";

import { link } from "@/components/fields/link";

import { revalidateHeader } from "./hooks/revalidateHeader";

enum ImageAspectRatio {
  "16/9" = "16/9",
  "3/2" = "3/2",
  "4/3" = "4/3",
  "1/1" = "1/1",
  "9/16" = "9/16",
  "1/2" = "1/2",
  "4/1" = "4/1",
  "3/1" = "3/1",
  "auto" = "auto",
}

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

// [
//       {
//         label: "16/9",
//         value: "16/9",
//       },
//       {
//         label: "3/2",
//         value: "3/2",
//       },
//       {
//         label: "4/3",
//         value: "4/3",
//       },
//       {
//         label: "1/1",
//         value: "1/1",
//       },
//       {
//         label: "9/16",
//         value: "9/16",
//       },
//       {
//         label: "1/2",
//         value: "1/2",
//       },
//       {
//         label: "4/1",
//         value: "4/1",
//       },
//       {
//         label: "3/1",
//         value: "3/1",
//       },
//       {
//         label: "auto",
//         value: "auto",
//       },
//     ],
