import { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  backgroundImageUrl?: string;
  url?: string;
  shadow?: boolean;
};

export type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export type CardActionsProps = {
  children: ReactNode;
  className?: string;
};
