import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from ".";

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends ButtonVariantProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  [k: string]: unknown;
}

export enum ButtonVariant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Badge = "badge",
  Ghost = "ghost",
  GhostDark = "ghost-dark",
}

export enum ButtonSize {
  Base = "base",
  Small = "sm",
  Large = "lg",
}
