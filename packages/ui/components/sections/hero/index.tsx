import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { RichText } from "../../ui/richText";
import type { IHeroProps } from "./types";

export function Hero({ title, text, image, links }: IHeroProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="space-y-8">
        <h1 className="text-textColor text-7xl font-bold">{title}</h1>
        <RichText {...text} />
        <div className="flex items-center gap-4">
          {links.map((link, i) => (
            <Link key={i} {...link} />
          ))}
        </div>
      </div>
      <div className="w-1/2 lg:w-1/3">
        <Image {...image} fit="contain" />
      </div>
    </div>
  );
}
