import clsx from "clsx";

import { useSelectContext } from "../selectContext/useSelectContext";
import { Item as DropdownItem } from "ui/dropdown/item/Item";
import { Icon } from "ui/icon/Icon";

import { ItemProps } from "./Item.types";
import styles from "./Item.module.scss";

export const Item = ({ children, value, index, icon, className, onClick }: ItemProps) => {
  const selectContext = useSelectContext();

  return (
    <DropdownItem
      onClick={() => {
        selectContext.onChange(value);

        if (onClick) {
          onClick();
        }
      }}
      role="option"
      aria-selected={value === selectContext.value}
      icon={icon}
      index={index}
      className={className}
    >
      {children}
      <Icon
        name="icon-check"
        className={clsx(styles["select-item__icon"], {
          [styles["select-item__icon--visible"]]: value === selectContext.value,
        })}
      />
    </DropdownItem>
  );
};
