import { ReactNode } from "react";

export type ItemProps = {
  value: string | number | boolean;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  index?: number;
  onClick?(): void;
};
