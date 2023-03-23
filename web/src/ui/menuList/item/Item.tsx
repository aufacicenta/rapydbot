import clsx from "clsx";

import { ItemProps } from "./Item.types";
import styles from "./Item.module.scss";

export const Item = ({ children, icon, role, className, ...props }: ItemProps) => (
  <li className={clsx(styles["menu-list__item"], className)} role={role || "menuitem"} {...props}>
    {icon}
    {children}
  </li>
);
