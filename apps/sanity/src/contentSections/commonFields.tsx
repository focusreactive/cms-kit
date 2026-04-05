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

export const getThemeField = (required = false) =>
  defineField({
    name: "theme",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "Light", value: "light" },
        { title: "Dark", value: "dark" },
        { title: "Light Gray", value: "light-gray" },
        { title: "Dark Gray", value: "dark-gray" },
      ],
      layout: "dropdown",
    },
    initialValue: "light",
    validation: (Rule) => (required ? Rule.required() : Rule),
  });

export const sectionCommonFields = [
  getThemeField(),
  defineField({
    name: "paddingY",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "None", value: "none" },
        { title: "Base", value: "base" },
        { title: "Large", value: "large" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "paddingX",
    type: "string",
    group: CommonGroup.Style,
    options: {
      list: [
        { title: "None", value: "none" },
        { title: "Base", value: "base" },
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
        { title: "None", value: "none" },
        { title: "Base", value: "base" },
        { title: "Full", value: "full" },
      ],
      layout: "dropdown",
    },
    initialValue: "base",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "background",
    type: "object",
    group: CommonGroup.Style,
    fields: [
      defineField({
        name: "type",
        type: "string",
        title: "Background Type",
        options: {
          list: [
            { title: "Image", value: "image" },
            { title: "Video", value: "video" },
          ],
          layout: "radio",
        },
      }),
      defineField({
        name: "image",
        type: "image",
        title: "Background Image",
        options: {
          hotspot: true,
        },
        hidden: ({ parent }) => parent?.type !== "image",
      }),
      defineField({
        name: "video",
        type: "file",
        title: "Background Video",
        options: {
          accept: "video/*",
        },
        hidden: ({ parent }) => parent?.type !== "video",
      }),
      defineField({
        name: "overlay",
        type: "string",
        title: "Overlay Color",
        options: {
          list: [
            { title: "Black", value: "black" },
            { title: "White", value: "white" },
          ],
          layout: "dropdown",
        },
        initialValue: "black",
        hidden: ({ parent }) => !parent?.image && !parent?.video,
      }),
      defineField({
        name: "opacity",
        type: "number",
        title: "Overlay Opacity (%)",
        initialValue: 35,
        validation: (Rule) => Rule.min(0).max(100),
        hidden: ({ parent }) => !parent?.overlay,
      }),
    ],
  }),
];
