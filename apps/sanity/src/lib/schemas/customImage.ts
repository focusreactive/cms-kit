import { ImageAspectRatio } from "@shared/ui/components/ui/image/types";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "customImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "height",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      options: {
        list: Object.values(ImageAspectRatio).map((aspectRatio) => ({
          title: aspectRatio,
          value: aspectRatio,
        })),
      },
      validation: (Rule) => Rule.required(),
      initialValue: ImageAspectRatio["auto"],
    }),
  ],
});
