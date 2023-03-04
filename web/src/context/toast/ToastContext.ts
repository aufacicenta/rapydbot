import { createContext } from "react";

import { ToastContextType } from "./ToastContext.types";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
