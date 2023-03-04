import clsx from "clsx";

import { Icon } from "ui/icon/Icon";

import { CategoryPillsProps } from "./CategoryPills.types";
import styles from "./CategoryPills.module.scss";
import { Pill } from "./pill/Pill";

export const CategoryPills = ({ children, className }: CategoryPillsProps) => (
  <div className={clsx(styles["category-pills"], className)}>
    {children}{" "}
    <div className={styles["category-pills__scroll-icon"]}>
      <Icon name="icon-chevron-right" />
    </div>
  </div>
);

CategoryPills.Pill = Pill;
