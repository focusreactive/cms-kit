import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { RichText } from "../../ui/richText";
import { BlogStyle, type IBlogPostCardProps } from "./types";

export default function BlogPostCard({
  style,
  image,
  link,
  text,
  readMoreLabel,
}: IBlogPostCardProps) {
  return (
    <Link {...link}>
      <article className="bg-bgColor group flex max-w-xl flex-col items-start gap-y-4">
        {style === BlogStyle.ThreeColumnWithImages ? (
          <div className="h-56 w-full overflow-hidden rounded-2xl bg-cover bg-center">
            <Image {...image} />
          </div>
        ) : null}
        <div className="group relative group-hover:underline">
          <RichText {...text} />
        </div>
        {readMoreLabel && (
          <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
            {readMoreLabel}
            <span aria-hidden="true">&rsaquo;</span>
          </span>
        )}
      </article>
    </Link>
  );
}
