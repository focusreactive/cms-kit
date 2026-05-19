import { cn } from "../../../utils";
import { AlignVariant } from "../../sections/header/types";
import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import type { IHeaderProps } from "./types";

export function Header({
  links,
  className,
  image,
  alignVariant,
}: IHeaderProps) {
  return (
    <header
      className={cn("sticky left-0 top-0 z-50  bg-white/30  backdrop-blur-md", className)}
    >
      <div className="flex gap-10 max-w-containerMaxW px-containerBase mx-auto">
        <div className="h-20">{image && <Image {...image} fit="contain" />}</div>
        <nav
          className={cn(
            "flex grow flex-wrap items-center justify-center gap-3 gap-x-6",
            {
              "justify-center": alignVariant === AlignVariant.Center,
              "justify-start": alignVariant === AlignVariant.Left,
              "justify-end": alignVariant === AlignVariant.Right,
            },
          )}
          aria-label="main mavigation"
        >
          {links.map((link, i) => (
            <Link key={i} {...link} />
          ))}
          </nav>
        </div>
    </header>
  );
}
