import { ReactNode } from "react";

export type ThemeSelectorProps = {
  children?: ReactNode;
  className?: string;
};

export type Theme = "light" | "dark";
