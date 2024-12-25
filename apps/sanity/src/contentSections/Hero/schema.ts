import { defineField } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export default {
  options: {},
  name: "section.hero",
  title: "Hero",
  type: "document",
  groups: commonGroups,
  fields: [
    defineField({
      name: "globalData",
      title: "Global Data",
      type: "reference",
      to: [{ type: "section.hero" }],
      group: CommonGroup.Content,
    }),
    defineField({
      name: "title",
      type: "string",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: CommonGroup.Content,
      name: "text",
      type: "customRichText",
    }),
    defineField({
      group: CommonGroup.Content,
      name: "image",
      type: customImage.name,
    }),
    defineField({
      group: CommonGroup.Content,
      name: "links",
      type: "array",
      of: [{ type: customLink.name }],
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      title: "title",
      image: "image.image",
    },
    prepare({ title, image }: any) {
      return {
        title,
        subtitle: "Hero",
        media: image,
      };
    },
  },
};
