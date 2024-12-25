import React from "react";

import { cn } from "../../../utils";

export type SwitchProps = {
  className?: string;
  options?: {
    label: string;
    value: string;
    extraInfo?: string;
  }[];
  selectedOption?: string;
  onChange?: (value: string) => void;
};

export const HorizontalSelect = ({ className, ...props }: SwitchProps) => (
  <div
    className={cn(
      "relative flex self-center rounded-lg bg-gray-100 p-0.5 sm:mt-8",
      className,
    )}
  >
    {props.options?.map((option) => (
      <button
        key={option.value}
        type="button"
        className={`${
          option.value === props.selectedOption ? "bg-white" : ""
        } relative w-1/2 whitespace-nowrap rounded-md py-2 text-sm font-medium text-gray-700 ring-2 ring-transparent focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-8`}
        onClick={() => props.onChange?.(option.value)}
      >
        {option.label}

        {option.extraInfo && (
          <span className="absolute -right-2.5 -top-1.5 m-0 rotate-6 rounded-full border border-blue-200 bg-blue-100 px-1.5 py-0.5 text-[11px] leading-none text-blue-700">
            {option.extraInfo}
          </span>
        )}
      </button>
    ))}
  </div>
);
