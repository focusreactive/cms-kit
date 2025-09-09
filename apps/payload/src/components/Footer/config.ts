import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
// import { ImageAspectRatio } from "@shared/ui/components/ui/image/types";
import type { GlobalConfig } from "payload";

import { link } from "@/components/fields/link";

// import { ImageAspectRatio } from "../../../../../packages/ui/components/ui/image/types";
import { revalidateFooter } from "./hooks/revalidateFooter";

// import { ImageAspectRatio } from "./types";

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

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "image",
      type: "group",
      label: "Image",
      required: true,
      fields: [
        {
          name: "image",
          label: "Asset",
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
          options: Object.values(ImageAspectRatio).map((aspectRatio) => ({
            label: aspectRatio,
            value: aspectRatio,
          })),
        },
      ],
    },
    {
      name: "text",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    {
      name: "links",
      type: "array",
      fields: [link({})],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/Footer/RowLabel#RowLabel",
        },
      },
    },
    {
      name: "copywriteText",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
