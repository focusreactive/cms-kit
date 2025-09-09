import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

import { ImageAspectRatio } from "@/lib/sharedTypes";
import { linkGroup } from "@/components/fields/linkGroup";

export const Hero: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "globalData",
              type: "select",
              defaultValue: "defaultHero",
              label: "Global data",
              options: [
                {
                  label: "custom hero",
                  value: "customHero",
                },
                {
                  label: "default hero",
                  value: "defaultHero",
                },
              ],
            },
            {
              name: "title",
              type: "text",
              label: "Title",
            },
            {
              name: "text",
              type: "richText",
              label: "Text",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ];
                },
              }),
            },
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
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
          ],
        },
        {
          label: "Style",
          fields: [
            {
              name: "theme",
              label: "Theme",
              type: "select",
              options: [
                {
                  label: "light",
                  value: "light",
                },
                {
                  label: "dark",
                  value: "dark",
                },
                {
                  label: "light gray",
                  value: "light-gray",
                },
                {
                  label: "dark gray",
                  value: "dark-gray",
                },
              ],
            },
            {
              name: "marginTop",
              type: "select",
              defaultValue: "base",
              label: "Margin Top",
              required: true,
              options: [
                {
                  label: "none",
                  value: "none",
                },
                {
                  label: "base",
                  value: "base",
                },
                {
                  label: "large",
                  value: "large",
                },
              ],
            },
            {
              name: "paddingX",
              type: "select",
              defaultValue: "large",
              label: "Padding X",
              required: true,
              options: [
                {
                  label: "none",
                  value: "none",
                },
                {
                  label: "base",
                  value: "base",
                },
                {
                  label: "large",
                  value: "large",
                },
              ],
            },
            {
              name: "paddingY",
              type: "select",
              defaultValue: "large",
              label: "Padding Y",
              required: true,
              options: [
                {
                  label: "none",
                  value: "none",
                },
                {
                  label: "base",
                  value: "base",
                },
                {
                  label: "large",
                  value: "large",
                },
              ],
            },
            {
              name: "marginBottom",
              type: "select",
              defaultValue: "large",
              label: "Margin Bottom",
              required: true,
              options: [
                {
                  label: "none",
                  value: "none",
                },
                {
                  label: "base",
                  value: "base",
                },
                {
                  label: "large",
                  value: "large",
                },
              ],
            },
            {
              name: "maxWidth",
              type: "select",
              defaultValue: "base",
              label: "Max Width",
              required: true,
              options: [
                {
                  label: "base",
                  value: "base",
                },
                {
                  label: "none",
                  value: "none",
                },
                {
                  label: "small",
                  value: "small",
                },
              ],
            },
            {
              name: "bgImage",
              type: "upload",
              label: "Background Image",
              relationTo: "media",
            },
          ],
        },
      ],
    },
  ],
  // label: "Hero",
  // label: false,
};
