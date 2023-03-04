import clsx from "clsx";

import { NavigationProps } from "./Navigation.types";
import styles from "./Navigation.module.scss";

export const Navigation: React.FC<NavigationProps> = ({ children, className }) => (
  <div className={clsx(styles.navigation, className)}>{children}</div>
);
