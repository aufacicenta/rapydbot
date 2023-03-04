import { ButtonCommonProps, DefaultButtonProps, LinkButtonProps } from "../button/Button.types";

export type IconButtonProps = Omit<ButtonCommonProps, "size"> &
  (LinkButtonProps | DefaultButtonProps) & {
    size?: "xxs" | "xs" | "s" | "m" | "l";
  };
