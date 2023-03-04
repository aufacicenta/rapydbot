import { CSSProperties } from "react";

import { ToastOptions } from "context/toast/ToastContext.types";

export type ToastProps = Omit<ToastOptions, "timeout" | "withTimeout" | "id"> & {
  className?: string;
  style?: CSSProperties;
  onClose?(): void;
};
