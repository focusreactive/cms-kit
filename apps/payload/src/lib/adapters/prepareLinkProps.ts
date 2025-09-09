import React from "react";
import type { Page, Post } from "@/generated/payload-types";
import { ButtonProps } from "@/payloadComponents/ui/button";
import {
  ButtonSize,
  ButtonVariant,
  type ButtonVariantProps,
} from "@shared/ui/components/ui/button/types";
import { type LinkProps } from "@shared/ui/components/ui/link/types";

type PayloadLinkType = {
  label: string;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages";
    value: Page | Post | string | number;
  } | null;
  url?: string | null;
  // size?: ButtonSize | null;
  // variant?: ButtonVariant| null
  size?: "base" | "sm" | "lg" | null | undefined;
  variant?: ButtonVariant | null;
  type?: "custom" | "reference" | null;
};

type Props = {
  id?: string | null | undefined;
  link: PayloadLinkType;
};

export const prepareLinkProps = (props?: Props): LinkProps => {
  if (!props || !props.link) return { text: "", href: "" };

  const {
    type,
    // className,
    label,
    // newTab,
    reference,
    size,
    variant,
    url,
  } = props.link;

  const href =
    type &&
    type === "reference" &&
    reference &&
    typeof reference.value === "object" &&
    reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url;

  // const newTabProps = newTab // TO-DO: LinkProps do not support this property
  //   ? { rel: "noopener noreferrer", target: "_blank" }
  //   : {};

  return {
    text: label,
    href: href ?? "",
    variant,
    // size,
    // variant: appearance as ButtonVariantProps["variant"],
    size: size as ButtonVariantProps["size"],
    className: undefined,
  };
};
