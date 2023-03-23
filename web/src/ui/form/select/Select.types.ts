import { DetailedHTMLProps, HTMLAttributes, CSSProperties, FocusEvent, ChangeEvent } from "react";

export type SelectProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  id: string;
  inputProps: {
    onBlur?: (event?: FocusEvent<HTMLSelectElement>) => void;
    onChange: (value: ChangeEvent<HTMLSelectElement> | string | number) => void;
    onFocus?: (event?: FocusEvent<HTMLSelectElement>) => void;
    value: string | number | boolean | undefined;
  };
  hasError?: boolean;
  hintMessage?: string;
  listboxClassName?: string;
  disabled?: boolean;
  prefix?: string;
  "aria-describedby"?: string;
  size?: "s" | "m" | "l";
  className?: string;
  selectButtonClassName?: string;
  isNotOutlined?: boolean;
  style?: CSSProperties;
  formElementClassName?: string;
  required?: boolean;
  onClear?(): void;
};
