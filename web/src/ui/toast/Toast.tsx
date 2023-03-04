import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Icon } from "ui/icon/Icon";
import { Typography } from "ui/typography/Typography";

import { ToastProps } from "./Toast.types";
import styles from "./Toast.module.scss";

export const Toast = ({ title, actionText, children, className, style, variant, onClose }: ToastProps) => {
  const { t } = useTranslation("common");

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={clsx(
        styles.toast,
        {
          [styles["toast--error"]]: variant === "error",
          [styles["toast--confirmation"]]: variant === "confirmation",
        },
        className,
      )}
      style={style}
    >
      <div className={styles.toast__icon}>
        {variant === "info" && <Icon name="icon-notification-circle" />}
        {variant === "confirmation" && <Icon name="icon-checkmark-circle" />}
        {variant === "error" && <Icon name="icon-warning" />}
      </div>
      <div className={styles.toast__content}>
        <Typography.Headline4 className={styles.toast__title}>{title}</Typography.Headline4>
        {children}
      </div>
      <button type="button" className={styles["toast__close-button"]} aria-label="close" onClick={onClose}>
        {/* @TODO i18n */}
        {actionText || t("toast.cta.dismiss")}
      </button>
    </div>
  );
};
