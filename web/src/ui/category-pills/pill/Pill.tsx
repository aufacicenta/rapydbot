import clsx from "clsx";

import { Form } from "ui/form/Form";

import { PillProps } from "./Pill.types";
import styles from "./Pill.module.scss";

export const Pill: React.FC<PillProps> = ({ className, label, id, icon, type, name }) => (
  <span className={clsx(styles.pill, className)}>
    <Form.TextInput type={type} className={clsx(styles.pill__checkbox)} id={id} name={name} value={id}>
      <Form.Label htmlFor={id} className={clsx(styles.pill__label)}>
        {icon && <span className={styles["pill__label--icon"]}>{icon}</span>} {label}
      </Form.Label>
    </Form.TextInput>
  </span>
);
