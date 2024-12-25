import {
  CommonGroup,
  commonGroups,
} from "@/contentSections/commonFields";
import { defineField } from "sanity";

import customImage from "@/lib/schemas/customImage";
import customLink from "@/lib/schemas/customLink";
import customRichText from "@/lib/schemas/customRichText";

export default {
  name: "footer",
  title: "Footer",
  type: "document",
  groups: commonGroups,
  options: {},
  fields: [
    defineField({
      type: "string",
      name: "title",
      group: CommonGroup.Content,
      description: "For preview use only",
    }),
    defineField({
      name: "image",
      type: customImage.name,
      group: CommonGroup.Content,
    }),
    defineField({
      name: "text",
      type: customRichText.name,
      group: CommonGroup.Content,
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: customLink.name }],
      group: CommonGroup.Content,
    }),

    defineField({
      name: "copywriteText",
      type: "string",
      group: CommonGroup.Content,
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image.image",
    },
    prepare({ title, image }: any) {
      return {
        title,
        media: image,
      };
    },
  },
};
