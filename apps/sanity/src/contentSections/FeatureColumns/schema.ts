import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const featureColumn = defineType({
  name: "featureColumn",
  title: "Column",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      type: customImage.name,
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "icon.image",
    },
  },
});

export default {
  name: "section.featureColumns",
  title: "Feature Columns",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "heading",
      type: "heading",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Columns",
      type: "array",
      of: [{ type: featureColumn.name }],
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      title: "heading.title",
      items: "items",
    },
    prepare({ title, items }: any) {
      const count = items?.length ?? 0;

      return {
        title: title || "Feature Columns",
        subtitle: `Feature Columns · ${count} column${count === 1 ? "" : "s"}`,
      };
    },
  },
};
