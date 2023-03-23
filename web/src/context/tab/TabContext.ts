import { createContext } from "react";

import { TabContextType } from "./TabContext.types";

export const TabContext = createContext<TabContextType | undefined>(undefined);
