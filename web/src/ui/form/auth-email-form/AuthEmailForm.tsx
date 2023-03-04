import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Form } from "../Form";
import { Button } from "../../button/Button";

import styles from "./AuthEmailForm.module.scss";
import { AuthEmailFormProps } from "./AuthEmailForm.types";

export const AuthEmailForm: React.FC<AuthEmailFormProps> = ({ className, autoFocus, onSubmit, isLoading }) => {
  const { t } = useTranslation("auth");

  return (
    <Form className={clsx(styles["auth-email-form"], className)} onSubmit={onSubmit}>
      <div className={styles["auth-email-form__inline-wrapper"]}>
        <div className={styles["auth-email-form__inline-wrapper--form"]}>
          <Form.TextInput
            autoFocus={autoFocus}
            label={t("authEmailForm.emailLabel")}
            id="email"
            type="email"
            className={styles["auth-email-form__input"]}
          />
        </div>
        <div className={styles["auth-email-form__inline-wrapper--button"]}>
          <Button variant="outlined" type="submit" isLoading={isLoading}>
            {t("authEmailForm.button")}
          </Button>
        </div>
      </div>
    </Form>
  );
};
