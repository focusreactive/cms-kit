import type { FC } from "react";

import DonutModel from "./donut-model";
import GlobeModel from "./globe-model";
import KubikRubik from "./kubik-rubik";
import type { IThreeDElementProps } from "./types";

const MODELS_MAP: Record<IThreeDElementProps["model"], FC> = {
  donut: DonutModel,
  globe: GlobeModel,
  "kubik-rubik": KubikRubik,
};

export function ThreeDElement({ model }: IThreeDElementProps) {
  const ModelComponent = MODELS_MAP[model];

  if (!ModelComponent) return null;

  return (
    <div className="">
      <ModelComponent />
    </div>
  );
}
