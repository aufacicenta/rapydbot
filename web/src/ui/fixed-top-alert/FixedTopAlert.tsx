import clsx from "clsx";

import { FixedTopAlertProps } from "./FixedTopAlert.types";
import styles from "./FixedTopAlert.module.scss";

export const FixedTopAlert: React.FC<FixedTopAlertProps> = ({ children, className }) => (
  <div className={clsx(styles["fixed-top-alert"], className)}>{children}</div>
);
