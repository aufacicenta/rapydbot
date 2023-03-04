import { ReactNode } from "react";

export type TabContextControllerProps = {
  children: ReactNode;
  defaultPaneId: string;
};

export type TabContextType = {
  activePane: string;
  setActivePane: (id: string) => void;
};
