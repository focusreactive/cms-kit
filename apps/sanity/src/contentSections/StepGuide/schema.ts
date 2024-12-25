import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "@/contentSections/commonFields";
import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";

export const stepGuideItem = defineType({
  name: "stepGuideItem",
  type: "object",
  title: "Step Guide Item",
  fields: [
    defineField({
      name: "number",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "01",
    }),
    defineField({
      name: "text",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Some text",
    }),
    defineField({
      name: "image",
      type: customImage.name,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default {
  name: "section.stepGuide",
  title: "Step Guide",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [{ type: stepGuideItem.name }],
      validation: (Rule) => Rule.required().min(1),
      group: CommonGroup.Content,
    }),
    defineField({
      name: "link",
      type: customLink.name,
      validation: (Rule) => Rule.required(),
      group: CommonGroup.Content,
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      number: "items.0.number",
      text: "items.0.text",
      image: "items.0.image.image",
    },
    prepare(value: any) {
      return {
        media: value.image,
        subtitle: "Step Guide",
        title: `${value.number} ${value.text}`,
      };
    },
  },
};
