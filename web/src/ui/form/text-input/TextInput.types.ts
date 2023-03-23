import React, { ReactNode } from "react";

export type TextInputProps = React.HTMLProps<HTMLInputElement> & {
  id: string;
  children?: ReactNode;
};
