import { defineField, defineType } from "sanity";

import customRichText from "@/lib/schemas/customRichText";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const blogPost = defineType({
  name: "blogSection.post",
  type: "object",
  title: "Blog post",
  fields: [
    defineField({
      name: "date",
      type: "date",
    }),
    defineField({
      name: "link",
      type: "customLink",
    }),
    defineField({
      name: "image",
      type: "customImage",
    }),
    defineField({
      name: "text",
      type: "customRichText",
    }),
    //   defineField({
    //     name: 'authors',
    //     type: 'array',
    //     of: [{ type: blogAuthor.name }],
    //   }),
    //   defineField({
    //     name: 'tags',
    //     type: 'array',
    //     of: [{ type: blogTag.name }],
    //   }),
  ],
  preview: {
    prepare() {
      return {
        title: "Post",
      };
    },
  },
});

export default {
  name: "section.blog",
  title: "Blog",
  type: "object",
  groups: commonGroups,
  options: {},
  fields: [
    defineField({
      name: "text",
      type: customRichText.name,
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "style",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: [
          { title: "three column", value: "three-column" },
          {
            title: "three column with images",
            value: "three-column-with-images",
          },
          {
            title: "three column with background images",
            value: "three-column-with-background-images",
          },
        ],
        layout: "dropdown",
      },
      initialValue: "three-column",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "posts",
      type: "array",
      group: CommonGroup.Content,
      of: [{ type: blogPost.name }],
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      text: "text.text",
      style: "style",
    },
    prepare(value: any) {
      const block = (value.text || []).find(
        (block: { _type: string; children: any }) =>
          block._type === "block" && block.children?.[0].text,
      );

      return {
        title: block
          ? block.children
              .filter((child: { _type: string }) => child._type === "span")
              .map((span: { text: any }) => span.text)
              .join("")
          : "No text",
        description: value.style,
      };
    },
  },
};
