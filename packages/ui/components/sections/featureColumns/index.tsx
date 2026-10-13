import { Heading } from "../../ui/heading";
import { HeadingAlign } from "../../ui/heading/types";
import { Image } from "../../ui/image";
import type { IFeatureColumnsProps } from "./types";

export function FeatureColumns({ heading, items }: IFeatureColumnsProps) {
  return (
    <div className="not-prose flex flex-col gap-10 lg:gap-14">
      <Heading {...heading} align={HeadingAlign.Center} />

      <div className="divide-textSecondaryColor/20 grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
        {items?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 px-6 py-8 text-center sm:py-2"
          >
            {item.icon?.src ? (
              <div className="size-12 flex-none">
                <Image {...item.icon} />
              </div>
            ) : null}
            <h3 className="text-textColor text-lg font-semibold">
              {item.title}
            </h3>
            {item.description ? (
              <p className="text-textSecondaryColor text-sm">
                {item.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
