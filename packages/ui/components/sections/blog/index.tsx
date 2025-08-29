import { RichText } from "../../ui/richText";
import BlogPostCard from "./BlogPostCard";
import { BlogStyle, type IBlogSectionProps } from "./types";

// todo: rework section

export const templates: any = {
  [BlogStyle.ThreeColumn]: { header: "mx-auto max-w-2xl lg:mx-0" },
  [BlogStyle.ThreeColumnWithImages]: { header: "w-full text-center" },
  [BlogStyle.ThreeColumnWithBackgroundImages]: { header: "w-full text-center" },
};

export function BlogSection({ text, style, posts }: IBlogSectionProps) {
  return (
    <div className="bg-bgColor py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-12 px-6 lg:px-8">
        <div className={`${templates[style]?.header}`}>
          <RichText {...text} />
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogPostCard {...post} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
