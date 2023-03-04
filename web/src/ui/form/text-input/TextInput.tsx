import clsx from "clsx";
import { Field } from "react-final-form";

import { Typography } from "ui/typography/Typography";

import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";

export const TextInput: React.FC<TextInputProps> = ({
  className,
  id,
  type,
  placeholder,
  name,
  value,
  children,
  autoFocus,
  disabled,
  defaultValue,
}) => (
  <div className={clsx(styles["text-input"], "input-field", className)}>
    <Field
      id={id}
      name={name || id}
      component="input"
      type={type}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
    >
      {({ input, meta }) => (
        <>
          <input className={clsx(styles["text-input__field"], "validate")} disabled={disabled} id={id} {...input} />
          {meta.error && meta.touched && <Typography.Description flat>{meta.error}</Typography.Description>}
        </>
      )}
    </Field>
    {children && children}
  </div>
);
