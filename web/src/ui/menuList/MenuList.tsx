import { FC, forwardRef } from "react";
import clsx from "clsx";

import { MenuListProps } from "./MenuList.types";
import styles from "./MenuList.module.scss";
import { Item } from "./item/Item";

const MenuListComponent = forwardRef<HTMLUListElement, MenuListProps>(
  ({ children, className, size, role, ...props }, ref) => (
    <ul
      ref={ref}
      role={role || "menu"}
      className={clsx(
        styles["menu-list"],
        {
          [styles["menu-list--big"]]: size === "l",
        },
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  ),
);

// https://github.com/bmcmahen/sancho/pull/57c
export const MenuList = MenuListComponent as unknown as FC<MenuListProps> & { Item: typeof Item };

MenuList.Item = Item;
