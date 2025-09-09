// import {
//   ButtonSize,
//   ButtonVariant,
// } from "@shared/ui/components/ui/button/types";
import type { Field, GroupField } from "payload";

import deepMerge from "@/lib/utilities/deepMerge";

export enum ButtonVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Badge = "badge",
  Ghost = "ghost",
  GhostDark = "ghost-dark",
}

export enum ButtonSize {
  Base = "base",
  Small = "sm",
  Large = "lg",
}

export const sizeOptions: { label: string; value: ButtonSize }[] = [
  {
    label: "base",
    value: ButtonSize.Base,
  },
  {
    label: "small",
    value: ButtonSize.Small,
  },
  {
    label: "large",
    value: ButtonSize.Large,
  },
];

export const variantOptions: { label: string; value: ButtonVariant }[] = [
  {
    label: "default",
    value: ButtonVariant.Default,
  },
  {
    label: "primary",
    value: ButtonVariant.Primary,
  },
  {
    label: "secondary",
    value: ButtonVariant.Secondary,
  },
  {
    label: "badge",
    value: ButtonVariant.Badge,
  },
  {
    label: "ghost",
    value: ButtonVariant.Ghost,
  },
  {
    label: "ghostDark",
    value: ButtonVariant.GhostDark,
  },
];

type LinkType = (options?: { overrides?: Partial<GroupField> }) => Field;

export const link: LinkType = ({ overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "tabs",
        tabs: [
          {
            label: "General",
            fields: [
              {
                type: "row",
                fields: [
                  {
                    name: "type",
                    type: "radio",
                    admin: {
                      layout: "horizontal",
                      width: "50%",
                    },
                    defaultValue: "reference",
                    options: [
                      {
                        label: "Internal link",
                        value: "reference",
                      },
                      {
                        label: "Custom URL",
                        value: "custom",
                      },
                    ],
                  },
                  {
                    name: "newTab",
                    type: "checkbox",
                    admin: {
                      style: {
                        alignSelf: "flex-end",
                      },
                      width: "50%",
                    },
                    label: "Open in new tab",
                  },
                ],
              },
            ],
          },
          {
            label: "Style",
            fields: [
              {
                type: "row",
                fields: [
                  {
                    name: "size",
                    label: "Size",
                    type: "select",
                    defaultValue: "base",
                    options: sizeOptions,
                  },
                  {
                    name: "variant",
                    label: "Variant",
                    type: "select",
                    defaultValue: "default",
                    options: variantOptions,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Document to link to",
      relationTo: ["pages"],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
    },
  ];

  linkTypes.map((linkType) => ({
    ...linkType,
    admin: {
      ...linkType.admin,
    },
  }));
  // TO-DO: fix type error
  linkResult.fields[0]?.tabs[0].fields.push({
    type: "row",
    fields: [
      ...linkTypes,
      {
        name: "label",
        type: "text",
        label: "Label",
        required: true,
      },
    ],
  });

  return deepMerge(linkResult, overrides);
};
