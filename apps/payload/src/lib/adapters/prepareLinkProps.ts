import type { Page } from "@/generated/payload-types";
import {
  ButtonSize,
  ButtonVariant,
} from "@shared/ui/components/ui/button/types";
import { type LinkProps } from "@shared/ui/components/ui/link/types";

type PayloadLinkType = {
  label: string;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages";
    value: Page | string | number;
  } | null;
  url?: string | null;
  // TO-DO: fix size and variant types
  size?: ButtonSize | null;
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
    size,
    className: undefined,
  };
};
