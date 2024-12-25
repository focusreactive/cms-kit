import { defineField } from "sanity";

import customRichText from "@/lib/schemas/customRichText";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export default {
  name: "section.copy",
  title: "Copy",
  type: "object",
  groups: commonGroups,
  options: {},
  fields: [
    defineField({
      name: "columns",
      type: "array",
      group: CommonGroup.Content,
      of: [{ type: customRichText.name }],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),

    defineField({
      name: "isReversedOnMobile",
      type: "boolean",
      group: CommonGroup.Style,
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      text: "columns.0.text",
    },
    prepare(value: any) {
      const block = (value.text || []).find(
        (block: { _type: string }) => block._type === "block",
      );
      return {
        title: block
          ? block.children
              .filter((child: { _type: string }) => child._type === "span")
              .map((span: { text: any }) => span.text)
              .join("")
          : "No text",
      };
    },
  },
};
