import NextLink from "next/link";

import { cn, getLinkClickParams } from "../../../utils";
import { Button } from "../button";
import { type LinkProps } from "./types";

export function Link({
  children,
  text,
  href,
  className,
  style,
  clickDisabled,
  ...props
}: LinkProps) {
  const { className: clickClassName, ...clickParams } =
    getLinkClickParams(clickDisabled);

  return (
    <Button
      asChild
      href={href}
      style={style}
      className={cn(className, clickClassName)}
      {...clickParams}
      {...props}
    >
      <NextLink href={href}>{children || text}</NextLink>
    </Button>
  );
}
