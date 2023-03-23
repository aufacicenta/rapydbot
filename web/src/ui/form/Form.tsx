import "materialize-css";

import { Form as RFForm } from "react-final-form";
import clsx from "clsx";

import { FormProps } from "./Form.types";
import styles from "./Form.module.scss";
import { TextInput } from "./text-input/TextInput";
import { Select } from "./select/Select";
import { Label } from "./label/Label";

export const Form = ({ children, className, onSubmit, validate }: FormProps) => (
  <div className={clsx(styles.form, className, "form")}>
    <RFForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => <form onSubmit={handleSubmit}>{children}</form>}
    />
  </div>
);

Form.TextInput = TextInput;
Form.Label = Label;
Form.Select = Select;
