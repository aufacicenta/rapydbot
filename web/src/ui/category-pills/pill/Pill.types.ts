import { ReactNode } from "react";

export type PillProps = React.HTMLProps<HTMLInputElement> & {
  id: string;
  type: "checkbox" | "radio";
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
};
