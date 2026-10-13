import { defineField, defineType } from "sanity";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const processStep = defineType({
  name: "processStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});

export default {
  name: "section.processSteps",
  title: "Process Steps",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "heading",
      type: "heading",
      group: CommonGroup.Content,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "steps",
      type: "array",
      of: [{ type: processStep.name }],
      group: CommonGroup.Content,
      // Numbering is derived from position at render time, so reordering in
      // Studio renumbers the list — there is deliberately no number field.
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      title: "heading.title",
      steps: "steps",
    },
    prepare({ title, steps }: any) {
      const count = steps?.length ?? 0;

      return {
        title: title || "Process Steps",
        subtitle: `Process Steps · ${count} step${count === 1 ? "" : "s"}`,
      };
    },
  },
};
