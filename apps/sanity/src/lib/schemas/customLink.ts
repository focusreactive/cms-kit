import { CommonGroup, commonGroups } from "@/contentSections/commonFields";
import {
  ButtonSize,
  ButtonVariant,
} from "@shared/ui/components/ui/button/types";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "customLink",
  title: "Link",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "text",
      type: "string",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
      initialValue: "link text",
    }),
    defineField({
      group: CommonGroup.Content,
      name: "type",
      type: "string",
      title: "Link Type",
      options: {
        list: [
          { title: "URL", value: "url" },
          { title: "internal", value: "internal" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "internal",
    }),
    defineField({
      group: CommonGroup.Content,
      name: "href",
      type: "string",
      hidden: ({ parent }) => !parent?.type || parent?.type === "internal",
    }),
    defineField({
      group: CommonGroup.Content,
      name: "target",
      type: "string",
      options: {
        list: [
          { title: "self", value: "_self" },
          { title: "blank", value: "_blank" },
          { title: "parent", value: "_parent" },
          { title: "top", value: "_top" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "_self",
    }),

    defineField({
      group: CommonGroup.Content,
      // TODO: rename to `reference`
      name: "url",
      type: "reference",
      to: [{ type: "page" }], // todo: change to page.name
      hidden: ({ parent }) => !parent?.type || parent?.type === "url",
    }),

    defineField({
      group: CommonGroup.Style,
      name: "variant",
      type: "string",
      options: {
        list: Object.values(ButtonVariant).map((variant) => ({
          title: variant,
          value: variant,
        })),
      },
      validation: (Rule) => Rule.required(),
      initialValue: ButtonVariant.Default,
    }),

    defineField({
      group: CommonGroup.Style,
      name: "size",
      type: "string",
      options: {
        list: Object.values(ButtonSize).map((size) => ({
          title: size,
          value: size,
        })),
      },
      validation: (Rule) => Rule.required(),
      initialValue: ButtonSize.Base,
    }),
  ],
});
