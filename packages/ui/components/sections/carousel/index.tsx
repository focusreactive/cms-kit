"use client";

import {
  EffectCards,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  Navigation,
} from "swiper/modules";

import { GenericCarousel } from "../../ui/GenericCarousel";
import CarouselCard from "./CarouselCard";
import type { ICarouselProps } from "./types";

import "swiper/css/bundle";

import React, { useEffect, useRef } from "react";
import type { NavigationOptions } from "swiper/types";

import { cn } from "../../../utils";
import { type IGenericCarouselBaseProps } from "../../ui/GenericCarousel/types";

const getEffectModule = (effect: IGenericCarouselBaseProps["effect"]) => {
  switch (effect) {
    case "fade":
      return EffectFade;
    case "cube":
      return EffectCube;
    case "flip":
      return EffectFlip;
    case "coverflow":
      return EffectCoverflow;
    case "cards":
      return EffectCards;
    default:
      return undefined;
  }
};

const ArrowButton = React.forwardRef<HTMLButtonElement, any>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center text-gray-500 transition-all hover:text-gray-700",
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className=""
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  ),
);

export function Carousel({
  slides,
  customModules,
  customModulesParams,
  effect,
  params,
}: ICarouselProps) {
  const effectModule = getEffectModule(effect);

  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [navigation, setNavigation] = React.useState<NavigationOptions>({
    enabled: true,
    prevEl: prevButtonRef.current,
    nextEl: nextButtonRef.current,
  });
  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      setNavigation({
        enabled: true,
        prevEl: prevButtonRef.current,
        nextEl: nextButtonRef.current,
      });
    }
  }, [prevButtonRef, nextButtonRef]);

  return (
    <div className="not-prose relative">
      <ArrowButton
        ref={prevButtonRef}
        className={cn("absolute left-0 top-1/2", {
          "left-[15%]":
            effect && ["cube", "fade", "flip", "cards"].includes(effect),
        })}
      />

      <GenericCarousel
        slides={slides.map((slide) => ({
          children: (({
            isNext,
            isActive,
          }: {
            isNext: boolean;
            isActive: boolean;
          }) => (
            <CarouselCard
              {...slide}
              isActive={effect === "coverflow" ? isNext : isActive}
            />
          )) as unknown as React.ReactNode,
        }))}
        customModules={[
          Navigation,
          ...(customModules || []),
          ...(effectModule ? [effectModule] : []),
        ]}
        customModulesParams={{
          navigation,
          ...(customModulesParams || {}),
        }}
        effect={effect}
        params={params}
      />

      <ArrowButton
        ref={nextButtonRef}
        className={cn("absolute right-0 top-1/2 [&>svg]:rotate-180", {
          "right-[15%]":
            effect && ["cube", "fade", "flip", "cards"].includes(effect),
        })}
      />
    </div>
  );
}
