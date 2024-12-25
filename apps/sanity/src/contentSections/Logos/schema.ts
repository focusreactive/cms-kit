import { AlignVariant } from "@shared/ui/components/sections/logos/types";
import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const logoItem = defineType({
  name: "logoItem",
  type: "object",
  title: "Logo Item",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: "Logo type",
      options: {
        list: [
          { title: "logo", value: "logo" },
          { title: "clickable logo", value: "clickableLogo" },
        ],
      },
    }),
    defineField({
      name: "image",
      type: customImage.name,
    }),
    defineField({
      name: "link",
      type: customLink.name,
      hidden: ({ parent }) => !parent?.type || parent?.type === "logo",
    }),
  ],
  preview: {
    select: {
      media: "image.image",
    },
    prepare({ media }: any) {
      return {
        title: media.alt,
        media,
      };
    },
  },
});

export default {
  options: {},
  name: "section.logos",
  title: "Logos",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "items",
      type: "array",
      group: CommonGroup.Content,
      of: [{ type: logoItem.name }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "alignVariant",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: Object.values(AlignVariant).map((v) => ({
          title: v,
          value: v,
        })),
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
      initialValue: AlignVariant.Left,
    }),
    ...sectionCommonFields,
  ],
  preview: {
    prepare: () => ({
      title: "Logos",
    }),
  },
};
