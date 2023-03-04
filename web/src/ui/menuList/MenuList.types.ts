import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

export type MenuListProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  children: ReactNode;
  size?: "m" | "l";
};
