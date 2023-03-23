import { createContext } from "react";

import { CheckoutContextType } from "./CheckoutContext.types";

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
