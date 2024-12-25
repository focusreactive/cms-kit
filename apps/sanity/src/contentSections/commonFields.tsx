import { defineField, type FieldGroupDefinition } from "sanity";

export enum CommonGroup {
  Content = "content",
  Style = "style",
}

export const commonGroups: FieldGroupDefinition[] = [
  {
    name: CommonGroup.Content,
    title: "Content",
    default: true,
  },
  {
    name: CommonGroup.Style,
    title: "Style",
  },
];

export const themeField = defineField({
  name: "theme",
  type: "string",
  group: CommonGroup.Style,
  options: {
    list: [
      { title: "light", value: "light" },
      { title: "dark", value: "dark" },
    ],
    layout: "radio",
    direction: "horizontal",
  },
  initialValue: "light",
  validation: (Rule) => Rule.required(),
});

export const sectionCommonFields = [
  defineField({
    name: "marginTop",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "none", value: "none" },
        { title: "base", value: "base" },
        { title: "large", value: "lg" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "marginBottom",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "none", value: "none" },
        { title: "base", value: "base" },
        { title: "large", value: "lg" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "maxWidth",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "none", value: "none" },
        { title: "base", value: "base" },
        { title: "small", value: "small" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "backgroundColor",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "light", value: "light" },
        { title: "light gray", value: "light-gray" },
        { title: "dark gray", value: "dark-gray" },
        { title: "dark", value: "dark" },
        { title: "none", value: "none" },
      ],
      layout: "dropdown",
    },
    initialValue: "none",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "backgroundImage",
    type: "image",
    group: CommonGroup.Style,
  }),
];
