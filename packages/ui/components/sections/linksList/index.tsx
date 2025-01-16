import { cn } from "../../../utils";
import { Link } from "../../ui/link";
import type { ILinksListProps } from "./types";

export function LinksList({ links, alignVariant }: ILinksListProps) {
  return (
    <div
      className={cn("flex w-full flex-wrap items-center gap-6", {
        "justify-center": alignVariant === "center",
        "justify-start": alignVariant === "left",
        "justify-end": alignVariant === "right",
      })}
    >
      {links?.map((link, i) => <Link key={i} {...link} />)}
    </div>
  );
}
