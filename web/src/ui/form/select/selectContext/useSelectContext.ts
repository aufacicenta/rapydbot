import { useContext } from "react";

import { SelectContext } from "./SelectContext";

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useSelectContext must be used within an SelectContext");
  }

  return context;
};
