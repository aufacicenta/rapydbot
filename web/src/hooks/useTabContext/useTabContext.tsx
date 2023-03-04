import { useContext } from "react";

import { TabContext } from "context/tab/TabContext";

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (context === undefined) {
    throw new Error("useTabContext must be used within a TabContext");
  }

  return context;
};
