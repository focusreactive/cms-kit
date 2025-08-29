import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { RichText } from "../../ui/richText";
import type { IFooterProps } from "./types";

export function Footer({ links, text, copywriteText, image }: IFooterProps) {
  return (
    <footer className="pt- space-y-12">
      <div className="flex flex-col items-center gap-x-12 gap-y-8 lg:flex-row">
        <div className="flex flex-col items-start space-y-8">
          <div className="h-24">
            <Image {...image} fit="contain" />
          </div>
          <RichText {...text} />
        </div>
        <nav
          className="flex grow flex-wrap items-center justify-end gap-3 p-3"
          aria-label="footer mavigation"
        >
          {links.map((link, i) => (
            <Link key={link.text + i} {...link} />
          ))}
        </nav>
      </div>

      {copywriteText && (
        <p className="text-textColor text-center">{copywriteText}</p>
      )}
    </footer>
  );
}
