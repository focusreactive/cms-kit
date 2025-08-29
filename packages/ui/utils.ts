import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLinkClickParams(disabled = false) {
  return {
    "aria-disabled": disabled,
    className: disabled ? "pointer-events-none" : "",
    onClick: disabled ? (e: any) => e.preventDefault() : undefined,
  };
}

export { cva };
