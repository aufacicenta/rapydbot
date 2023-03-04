import { ReactNode } from "react";

export type TabProps = {
  children: ReactNode;
  defaultPaneId: string;
  className?: string;
};
