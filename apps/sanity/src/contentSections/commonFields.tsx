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

const getSpacingField = (name: string) =>
  defineField({
    name,
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "none", value: "none" },
        { title: "base", value: "base" },
        { title: "large", value: "large" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  });

export const getThemeField = (required = false) =>
  defineField({
    name: "theme",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "light", value: "light" },
        { title: "dark", value: "dark" },
        { title: "light gray", value: "light-gray" },
        { title: "dark gray", value: "dark-gray" },
      ],
      layout: "dropdown",
    },
    initialValue: "light",
    validation: (Rule) => (required ? Rule.required() : Rule),
  });

export const sectionCommonFields = [
  getThemeField(),
  getSpacingField("marginTop"),
  getSpacingField("paddingX"),
  getSpacingField("paddingY"),
  getSpacingField("marginBottom"),
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
    name: "backgroundImage",
    type: "image",
    group: CommonGroup.Style,
  }),
];
