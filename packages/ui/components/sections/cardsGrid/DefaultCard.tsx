import { cn } from "../../../utils";
import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { RichText } from "../../ui/richText";
import type { IDefaultCardProps } from "./types";

export default function DefaultCard({
  image,
  link,
  title,
  description,
  alignVariant,
  backgroundColor,
  rounded,
}: IDefaultCardProps) {
  return (
    <div
      className={cn(
        "bg-bgColor flex flex-none flex-col gap-y-3 p-4",
        backgroundColor,
        {
          "items-center": alignVariant === "center",
          "items-start": alignVariant === "left",
          "items-end": alignVariant === "right",
          "rounded-2xl": rounded === "large",
        },
      )}
    >
      {image?.src && (
        <div className="mb-6 size-12">
          <Image {...image} />
        </div>
      )}
      <div className="inline-block text-xl font-semibold">{title}</div>
      <RichText {...description} />
      <Link {...link} />
    </div>
  );
}
