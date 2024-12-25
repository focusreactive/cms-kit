import { AlignVariant } from "@shared/ui/components/sections/linksList/types";
import { defineField } from "sanity";

import customLink from "@/lib/schemas/customLink";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export default {
  options: {},
  name: "section.linksList",
  title: "Links list",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "links",
      type: "array",
      group: CommonGroup.Content,
      of: [{ type: customLink.name }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "alignVariant",
      type: "string",
      group: CommonGroup.Style,
      options: {
        list: Object.values(AlignVariant).map((v) => ({
          title: v,
          value: v,
        })),
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
      initialValue: AlignVariant.Left,
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      links: "links",
      alignVariant: "alignVariant",
    },
    prepare(value: any) {
      const linkText = value.links[0].text;

      return {
        title: linkText || "No text",
      };
    },
  },
};
