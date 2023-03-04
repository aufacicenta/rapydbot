import React, { useState } from "react";

import { TabContext } from "./TabContext";
import { TabContextControllerProps } from "./TabContext.types";

export const TabContextController = ({ children, defaultPaneId }: TabContextControllerProps) => {
  const [activePane, setActivePane] = useState(defaultPaneId);

  return <TabContext.Provider value={{ setActivePane, activePane }}>{children}</TabContext.Provider>;
};
