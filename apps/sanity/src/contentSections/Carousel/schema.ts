import { defineField, defineType } from "sanity";

import customImage from "@/lib/schemas/customImage";

import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "../commonFields";

export const carouselCard = defineType({
  name: "carouselCard",
  type: "object",
  title: "Carousel Card",
  options: {},
  fields: [
    defineField({
      name: "text",
      type: "customRichText",
    }),
    defineField({
      name: "image",
      type: customImage.name,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      image: "image.image",
    },
    prepare({ image }) {
      return {
        title: "Slide",
        media: image,
      };
    },
  },
});

export default {
  options: {},
  name: "section.carousel",
  title: "Carousel",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "slidesPerView",
      type: "number",
      group: CommonGroup.Content,
      initialValue: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: CommonGroup.Content,
      name: "slides",
      type: "array",
      of: [{ type: "carouselCard" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "effect",
      type: "string",
      group: CommonGroup.Content,
      options: {
        list: [
          { title: "Slide", value: "slide" },
          { title: "Coverflow", value: "coverflow" },
          { title: "Cube", value: "cube" },
          { title: "Fade", value: "fade" },
          { title: "Flip", value: "flip" },
          { title: "Cards", value: "cards" },
        ],
        layout: "radio",
      },
      initialValue: "slide",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "loop",
      type: "boolean",
      group: CommonGroup.Content,
      initialValue: false,
    }),
    ...sectionCommonFields,
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare: ({ slides }: any) => ({
      title: `Carousel - ${slides.length} slides`,
    }),
  },
};
