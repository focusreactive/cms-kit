import { CommonGroup, commonGroups } from "@/contentSections/commonFields";
import { AlignVariant } from "@shared/ui/components/sections/header/types";
import { defineField } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";

export default {
  name: "header",
  title: "Header",
  type: "document",
  groups: commonGroups,
  options: {},
  fields: [
    defineField({
      type: "string",
      name: "title",
      group: CommonGroup.Content,
      description: "For preview use only",
    }),
    defineField({
      name: "image",
      type: customImage.name,
      group: CommonGroup.Content,
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: customLink.name }],
      group: CommonGroup.Content,
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
      initialValue: AlignVariant.Right,
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image.image",
    },
    prepare({ title, image }: any) {
      return {
        title,
        media: image,
      };
    },
  },
};
