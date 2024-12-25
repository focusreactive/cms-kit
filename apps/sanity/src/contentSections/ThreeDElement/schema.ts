import {
  CommonGroup,
  commonGroups,
  sectionCommonFields,
} from "@/contentSections/commonFields";
import { defineField } from "sanity";

export default {
  name: "section.threeDElement",
  title: "3D Element",
  type: "object",
  groups: commonGroups,
  fields: [
    defineField({
      name: "model",
      type: "string",
      group: CommonGroup.Content,
      options: {
        list: [
          { title: "Donut", value: "donut" },
          { title: "Globe", value: "globe" },
          { title: "Kubik Rubik", value: "kubik-rubik" },
        ],
        layout: "dropdown",
      },
      initialValue: "donut",
      validation: (Rule) => Rule.required(),
    }),
    ...sectionCommonFields,
  ],
};
