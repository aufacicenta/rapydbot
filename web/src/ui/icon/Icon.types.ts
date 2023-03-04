import { Styles } from "./Icon.module.scss";

export type IconProps = React.HTMLProps<HTMLSpanElement> & {
  name: keyof Styles;
  className?: string;
};
