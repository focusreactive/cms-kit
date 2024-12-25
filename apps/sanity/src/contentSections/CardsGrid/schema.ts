import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

const featurePointStyles = [
  { title: "icon on the left", value: "icon-left" },
  {
    title: "icon with background on the left",
    value: "icon-left-with-background",
  },
  { title: "icon and title on the same line", value: "icon-title-inline" },
  { title: "icon on the top", value: "icon-top" },
  { title: "no icon", value: "no-icon" },
  {
    title: "icon on the left, separate title",
    value: "icon-left-separate-title",
  },
];

export const defaultCard = defineType({
  name: "defaultCard",
  type: "object",
  title: "Default card",
  options: {},
  groups: commonGroups,
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
      initialValue: "initial title",
    }),
    defineField({
      name: "description",
      type: "string",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
      initialValue: "initial description",
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: featurePointStyles,
        layout: "dropdown",
      },
      group: CommonGroup.Style,
      validation: (Rule) => Rule.required(),
      initialValue: "icon-left",
    }),
    defineField({
      name: "link",
      type: "customLink",
      group: CommonGroup.Content,
    }),
    defineField({
      name: "image",
      type: customImage.name,
      group: CommonGroup.Content,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      image: "image.image",
    },
    prepare({ title, subtitle, image }) {
      return {
        media: image,
        title,
        subtitle,
      };
    },
  },
});

export default {
  options: {},
  name: "section.cardsGrid",
  title: "Cards Grid",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      group: CommonGroup.Style,
      name: "columns",
      type: "number",
      options: {
        list: [1, 2, 3],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      group: CommonGroup.Content,
      of: [{ type: "defaultCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      columns: "columns",
    },
    prepare: ({ columns }: any) => ({
      title: `Cards Grid - ${columns} cols`,
    }),
  },
};
