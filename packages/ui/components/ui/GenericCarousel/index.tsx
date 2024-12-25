"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "../../../utils";
import type { IGenericCarouselProps } from "./types";

const defaultEffectsConfig = {
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  cubeEffect: {
    shadow: true,
    slideShadows: false,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  fadeEffect: {
    crossFade: false,
  },
  cardsEffect: {
    perSlideOffset: 8,
    perSlideRotate: 2,
    rotate: true,
    slideShadows: false,
  },
  flipEffect: {
    limitRotation: true,
    slideShadows: false,
  },
};

export function GenericCarousel({
  slides,
  customModules,
  customModulesParams,
  effect,
  params,
}: IGenericCarouselProps) {
  // to trigger rerender in preview when changing effect
  useEffect(() => {
    console.log("effect changed");
  }, [effect]);

  return (
    <div className="relative mask-shadow-y">
      <Swiper
        modules={customModules || []}
        {...customModulesParams}
        effect={effect}
        slidesPerView="auto"
        {...params}
        {...defaultEffectsConfig}
        className={cn("!py-10", {
          "w-[500px] !pb-12 !pt-10":
            effect && ["cube", "flip", "cards"].includes(effect),
          "w-1/2": effect === "fade",
        })}
      >
        {(slides || []).map((slide, i) => {
          return (
            <SwiperSlide className={cn("!h-auto", slide.className)} key={i}>
              {slide.children}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
