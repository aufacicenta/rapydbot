import React, { ReactNode } from "react";

export type LabelProps = React.HTMLProps<HTMLLabelElement> & {
  children?: ReactNode;
  className?: string;
};
