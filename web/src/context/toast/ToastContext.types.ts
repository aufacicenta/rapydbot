import { ReactNode } from "react";

export type ToastContextProviderProps = {
  children: ReactNode;
};

export type ToastOptions = {
  id?: string;
  title?: ReactNode;
  variant: "info" | "error" | "confirmation";
  timeout?: number;
  withTimeout?: boolean;
  children?: ReactNode;
  actionText?: string;
  position?: "top" | "bottom";
  onActionClick?(): void;
};

export type ToastContextType = {
  trigger: (toast: ToastOptions) => void;
};
