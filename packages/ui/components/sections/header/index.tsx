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
    <header className={cn("bg-bgColor flex gap-10 py-3", className)}>
      <div className="h-10">{image && <Image {...image} fit="contain" />}</div>
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
    </header>
  );
}
