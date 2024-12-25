import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "@/contentSections/commonFields";
import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";

export const pricingTier = defineType({
  name: "pricingTableTier",
  type: "object",
  title: "Pricing Table Tier",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: customImage.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "CTA",
      type: customLink.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "popular",
      type: "boolean",
      title: "Popular",
    }),
  ],
});

export default {
  name: "section.pricingTable",
  title: "Pricing Table",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "tiers",
      type: "array",
      of: [{ type: pricingTier.name }],
      validation: (Rule) => Rule.required(),
      group: CommonGroup.Content,
    }),
    defineField({
      name: "yearlyDiscountPercentage",
      type: "number",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "extraServiceEnabled",
      type: "boolean",
      group: CommonGroup.Content,
    }),
    defineField({
      name: "extraService",
      type: "object",
      group: CommonGroup.Content,
      hidden: ({ parent }) => !parent?.extraServiceEnabled,
      fields: [
        defineField({
          name: "text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "cost",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    ...sectionCommonFields,
  ],
  preview: {
    prepare: () => ({
      title: `Pricing Table`,
    }),
  },
};
