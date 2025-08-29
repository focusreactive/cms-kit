import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../../utils";
import { ButtonSize, ButtonVariant, type ButtonProps } from "./types";

export const buttonVariants = cva(
  "leading-none inline text-center transition-all duration-150",
  {
    variants: {
      variant: {
        [ButtonVariant.Default]: "text-textColor",
        [ButtonVariant.Primary]:
          "font-medium text-bgColor rounded-2xl bg-primaryColor hover:text-primaryLightColor",
        [ButtonVariant.Secondary]:
          "font-medium text-textColor border border-textColor rounded-2xl focus:ring-4 focus:ring-textSecondaryColor",
        [ButtonVariant.Badge]:
          "rounded-2xl text-textSecondaryColor ring-1 ring-textSecondaryColor hover:ring-primaryColor",
        [ButtonVariant.Ghost]:
          "bg-bgColor radius-md text-textColor border border-bgColor hover:text-primaryColor font-medium rounded-2xl",
        [ButtonVariant.GhostDark]:
          "bg-textColor text-bgColor radius-md hover:bg-textSecondaryColor font-medium rounded-2xl",
      },
      size: {
        [ButtonSize.Base]: "px-4 py-2 text-base",
        [ButtonSize.Small]: "text-sm p-1",
        [ButtonSize.Large]: "text-lg py-3 px-8",
      },
    },
    defaultVariants: {
      variant: ButtonVariant.Default,
      size: ButtonSize.Base,
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  children,
  ...props
}: ButtonProps) {
  const Component = (asChild ? Slot : "button") as any;

  return (
    <Component
      className={cn(
        "not-prose",
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
