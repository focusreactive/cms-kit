import { defineField, defineType } from "sanity";

/**
 * Shared section heading. Registered as its own object type — the way
 * `customImage` and `customLink` are — so the two fields are declared once and
 * every section referencing `type: "heading"` stays in step with the shared
 * `<Heading>` component it maps onto.
 */
export default defineType({
  name: "heading",
  title: "Heading",
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
      description: "Optional. Leave empty to show the title on its own.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
