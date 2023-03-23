import { ReactNode, KeyboardEventHandler, MouseEvent as ReactMouseEvent } from "react";

export type ItemProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  index?: number;
  role?: "option";
  "aria-selected"?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLLIElement>;
  onClick?(e: ReactMouseEvent<HTMLLIElement, MouseEvent>): void;
};
