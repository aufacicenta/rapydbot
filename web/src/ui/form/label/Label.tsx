import clsx from "clsx";

import { LabelProps } from "./Label.types";
import styles from "./Label.module.scss";

export const Label: React.FC<LabelProps> = ({ children, className, htmlFor, id, ...props }) => (
  <label className={clsx(styles.label, className)} htmlFor={htmlFor || id} {...props}>
    {children}
  </label>
);
