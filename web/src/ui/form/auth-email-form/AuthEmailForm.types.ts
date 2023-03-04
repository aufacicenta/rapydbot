import { FormProps } from "../Form.types";

export type AuthEmailFormProps = {
  className?: string;
  autoFocus?: boolean;
  onSubmit: FormProps["onSubmit"];
  isLoading: boolean;
};
