import { createContext } from "react";

import { DropdownContextType } from "./DropdownContext.types";

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);
