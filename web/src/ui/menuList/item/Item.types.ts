import { ReactNode, DetailedHTMLProps, LiHTMLAttributes } from "react";

export type ItemProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  children: ReactNode;
  icon?: ReactNode;
  index?: number;
};
