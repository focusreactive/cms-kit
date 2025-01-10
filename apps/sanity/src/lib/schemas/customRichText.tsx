import { CommonGroup, commonGroups } from "@/contentSections/commonFields";
// import { sectionsPresets } from "@/contentSections/presets";
import { AlignVariant } from "@shared/ui/components/ui/richText/types";
import { defineField, defineType } from "sanity";

export const richTextBreak = defineType({
  name: "break",
  type: "object",
  title: "Break",
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
  ],
  fields: [
    {
      name: "style",
      type: "string",
      title: "Break style",
      group: CommonGroup.Content,
      options: {
        list: [{ title: "line", value: "line" }],
      },
    },
  ],
});

const customRichText = defineType({
  name: "customRichText",
  title: "Rich text",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "text",
      type: "array",
      group: CommonGroup.Content,
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                type: "textColor",
              },
              {
                type: "highlightColor",
              },
            ],
          },
        },
        {
          type: "break",
        },
        {
          type: "customImage",
        },
        {
          type: "section.logos",
        },
        {
          type: "section.cardsGrid",
        },
        {
          type: "section.linksList",
        },
      ],
      // components: componentsWithBlocksInput({
      //   presets: Object.values(sectionsPresets)
      //     .flat()
      //     .filter((v) =>
      //       [
      //         "section.logos",
      //         "section.cardsGrid",
      //         "section.linksList",
      //       ].includes(v.value._type),
      //     ),
      //   isRichText: true,
      // }),
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
    defineField({
      name: "removeInnerMargins",
      type: "boolean",
      group: CommonGroup.Style,
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      text: "customRichText.text",
    },
    prepare(value: any) {
      const block = (value.text || []).find(
        (block: { _type: string }) => block._type === "block",
      );
      const image = (value.text || []).find(
        (block: { _type: string }) => block._type === "customImage",
      );

      if (image) {
        return {
          title: image.alt,
          media: image?.image,
        };
      }

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
});

export const basicRichText = defineType({
  name: "basicRichText",
  title: "Basic rich text",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "text",
      type: "array",
      group: CommonGroup.Content,
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                type: "textColor",
              },
              {
                type: "highlightColor",
              },
            ],
          },
        },
        {
          type: "break",
        },
      ],
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
    defineField({
      name: "removeInnerMargins",
      type: "boolean",
      group: CommonGroup.Style,
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      text: "customRichText.text",
    },
    prepare(value: any) {
      const block = (value.text || []).find(
        (block: { _type: string }) => block._type === "block",
      );
      const image = (value.text || []).find(
        (block: { _type: string }) => block._type === "customImage",
      );

      if (image) {
        return {
          title: image.alt,
          media: image?.image,
        };
      }

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
});

export default customRichText;
