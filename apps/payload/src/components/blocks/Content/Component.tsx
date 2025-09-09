import React from "react";
import type { ContentBlock as ContentBlockProps } from "@/generated/payload-types";

import { cn, Link } from "@shared/ui";

import { prepareLinkProps } from "@/lib/adapters/prepareLinkProps";
import renderRichText from "@/lib/renderRichText";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  };

  return (
    <div className="mx-auto my-16 max-w-screen-xl overflow-x-hidden rounded-2xl">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;
            const preparedLinkProps = prepareLinkProps(link);
            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    "md:col-span-2": size !== "full",
                  },
                )}
                key={index}
              >
                {richText &&
                  renderRichText({ data: richText, enableGutter: false })}

                {enableLink && <Link {...preparedLinkProps} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
