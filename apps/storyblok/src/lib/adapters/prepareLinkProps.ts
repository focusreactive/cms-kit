import type { LinkStoryblok } from "@/generated/extracted-types";
import type { ButtonVariantProps } from "@shared/ui/components/ui/button/types";
import { type LinkProps } from "@shared/ui/components/ui/link/types";

import { useDataContext } from "@/components/DataContext";

import { isPreview } from "../utils";

export enum LinkTypes {
  story = "story",
  url = "url",
  email = "email",
}

export const prepareLinkProps = (props?: LinkStoryblok): LinkProps => {
  const { allResolvedLinks } = useDataContext();

  if (!props) {
    return {
      text: "",
      href: "",
      clickDisabled: isPreview,
    };
  }

  let url = "";

  if (props.link.linktype === "url") {
    url = props.link.url;
  }

  if (props.link.linktype === "story") {
    const resolvedLink = allResolvedLinks?.find(
      (item) => item.uuid === props?.link.id,
    );

    if (resolvedLink?.url.startsWith("/")) {
      url = resolvedLink?.url;
    } else {
      url = `/${resolvedLink?.url}`;
    }
  }

  return {
    text: props.text,
    href: url,
    variant: props.variant as ButtonVariantProps["variant"],
    size: props.size as ButtonVariantProps["size"],
    clickDisabled: isPreview,
  };
};
