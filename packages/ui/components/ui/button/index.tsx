import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../../utils";
import { ButtonSize, ButtonVariant, type ButtonProps } from "./types";

export const buttonVariants = cva(
  "leading-none inline text-center hover:shadow-md transition-all duration-150",
  {
    variants: {
      variant: {
        [ButtonVariant.Default]: "text-textColor",
        [ButtonVariant.Primary]:
          "font-medium text-bgColor rounded-lg bg-primaryColor hover:outline",
        [ButtonVariant.Secondary]:
          "font-medium text-textColor border border-textColor rounded-lg focus:ring-4 focus:ring-textSecondaryColor",
        [ButtonVariant.Badge]:
          "rounded-full text-textSecondaryColor ring-1 ring-textSecondaryColor hover:ring-primaryColor",
        [ButtonVariant.Ghost]:
          "bg-bgColor radius-md text-textColor border border-bgColor hover:border-textSecondaryColor font-medium rounded-md",
        [ButtonVariant.GhostDark]:
          "bg-textColor text-bgColor radius-md hover:bg-textSecondaryColor font-medium rounded-md",
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
