import { FormProps as RFFormProps } from "react-final-form";
import { ReactNode } from "react";

export type FormProps = {
  children: ReactNode;
  className?: string;
} & RFFormProps<Record<string, unknown>, Partial<Record<string, unknown>>>;
