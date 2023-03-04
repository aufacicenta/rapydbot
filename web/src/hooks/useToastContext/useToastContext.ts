import { useContext } from "react";

import { ToastContext } from "context/toast/ToastContext";

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToastContext must be used within an ToastContext");
  }

  return context;
};
