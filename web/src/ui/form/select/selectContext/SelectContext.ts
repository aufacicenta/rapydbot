import { createContext } from "react";

import { SelectContextType } from "./SelectContext.types";

export const SelectContext = createContext<SelectContextType | undefined>(undefined);
