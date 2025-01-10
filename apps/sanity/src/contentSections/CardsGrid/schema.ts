import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const defaultCard = defineType({
  name: "defaultCard",
  type: "object",
  title: "Default card",
  options: {},
  groups: commonGroups,
  fields: [
    defineField({
      name: "image",
      type: customImage.name,
      group: CommonGroup.Content,
    }),
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
    }),
    defineField({
      name: "link",
      type: "customLink",
      group: CommonGroup.Content,
    }),
    defineField({
      name: "alignVariant",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "left",
    }),
    defineField({
      name: "backgroundColor",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: [
          { title: "light", value: "light" },
          { title: "light-gray", value: "light-gray" },
          { title: "dark-gray", value: "dark-gray" },
          { title: "dark", value: "dark" },
          { title: "none", value: "none" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "none",
    }),
    defineField({
      name: "rounded",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: [
          { title: "Large", value: "large" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "none",
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
