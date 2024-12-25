"use client";

import { useState } from "react";

import { cn } from "../../../utils";
import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import type { IStepGuideProps } from "./types";

export function StepGuide({ link, items }: IStepGuideProps) {
  // todo: implement using tailwind CSS only, no JS
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="not-prose grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="relative col-span-1 hidden md:block">
        {items.map(({ image }, index) => (
          <div
            key={index}
            className={cn(
              "absolute left-0 top-0 flex size-full gap-2 transition-all duration-200 ease-in-out",
              {
                "translate-y-4 opacity-0": index !== activeIndex,
                "translate-y-0 opacity-100": index === activeIndex,
              },
            )}
          >
            {image && (
              <div className="size-full">
                <Image {...image} fit="contain" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="col-span-1 space-y-12">
        <ul>
          {items.map(({ number, text }, index) => (
            <li
              key={number}
              className="group flex cursor-pointer items-center gap-6"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <div className="text-primaryColor pl-4 text-xl md:pl-0 lg:text-2xl">
                {number}
              </div>
              <p className="border-textColor text-textColor grow border-b py-4 text-xl font-light group-last:border-none lg:py-6 lg:text-3xl">
                {text}
              </p>
            </li>
          ))}
        </ul>

        {link && (
          <Link {...link} className="block w-full md:inline-block md:w-auto" />
        )}
      </div>
    </section>
  );
}
