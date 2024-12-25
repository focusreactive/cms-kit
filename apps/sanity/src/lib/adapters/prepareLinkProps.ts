import type { CustomLink } from "@/generated/extracted-types";
import { stegaClean } from "@sanity/client/stega";
import type { ButtonVariantProps } from "@shared/ui/components/ui/button/types";
import { type LinkProps } from "@shared/ui/components/ui/link/types";

export const prepareLinkProps = (props?: CustomLink): LinkProps => {
  if (!props || !props.text) return { text: "", href: "" };

  let href = "";
  if (props.type === "url") {
    href = props.href as string;
  }

  if (props.type === "internal") {
    // todo: remove @ts-ignore when sanity typegen will be working with MemberExpression
    // @ts-ignore
    href = props?.url?.slug ? props.url.slug?.join("/") : "";
  }

  return {
    text: props.text,
    href: href,
    variant: stegaClean(props.variant) as ButtonVariantProps["variant"],
    size: stegaClean(props.size) as ButtonVariantProps["size"],
  };
};
