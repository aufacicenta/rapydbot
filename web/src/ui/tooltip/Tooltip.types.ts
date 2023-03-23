import { ReactNode } from "react";

export type TooltipWrapperProps = {
  children: ReactNode;
};

export type TooltipProps = {
  description: string;
  className?: string;
  title?: string;
};
