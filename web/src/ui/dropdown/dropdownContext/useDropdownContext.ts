import { useContext } from "react";

import { DropdownContext } from "./DropdownContext";

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (context === undefined) {
    throw new Error("useDropdownContext must be used within an DropdownContext");
  }

  return context;
};
