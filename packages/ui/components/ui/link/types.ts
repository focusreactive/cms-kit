import type { ButtonVariantProps } from "../button/types";

export interface LinkProps extends ButtonVariantProps {
  children?: React.ReactNode;
  text: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  clickDisabled?: boolean;
}
