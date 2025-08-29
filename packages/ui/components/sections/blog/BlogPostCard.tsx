import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { RichText } from "../../ui/richText";
import { BlogStyle, type IBlogPostCardProps } from "./types";

export default function BlogPostCard({
  style,
  image,
  link,
  text,
}: IBlogPostCardProps) {
  console.log("link", link);
  return (
    <Link {...link}>
      <article className="bg-bgColor group flex max-w-xl flex-col items-start gap-y-4">
        {style === BlogStyle.ThreeColumnWithImages ? (
          <div className="h-56 w-full overflow-hidden rounded-2xl bg-cover bg-center">
            <Image {...image} />
          </div>
        ) : null}
        {/* <div className="flex items-center gap-x-4 text-xs">
        {post.tags.map((tag) => {
          return (
            <SmartLink
              key={getCmsKey(tag)}
              className={
                "relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              }
            />
          );
        })}
      </div> */}
        <div className="group relative group-hover:underline">
          <RichText {...text} />
        </div>

        {/* <div className="relative flex items-center gap-x-4 self-baseline">
        <div className="bg-primary2LightColor size-10 overflow-hidden rounded-full">
          <Image {...image} />
        </div>
        <div className="text-sm leading-6">
          <p className="text-textColor font-semibold">
            <a href="#">
              <span className="absolute inset-0"></span>
              {"focusreacive"}
            </a>
          </p>
        </div>
      </div> */}
      </article>
    </Link>
  );
}
