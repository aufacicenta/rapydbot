import { CSSProperties } from "react";

import { ButtonProps } from "../../button/Button.types";

export type CloseButtonProps = {
  className?: string;
  style?: CSSProperties;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  onClick(): void;
};
