import clsx from "clsx";
import React from "react";

import { Item } from "./item/Item";
import { ItemProps } from "./item/Item.types";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar: React.FC<SidebarProps> & { Item: React.FC<ItemProps> } = ({ children, className }) => (
  <div className={clsx(styles.sidebar, className)}>{children}</div>
);

Sidebar.Item = Item;
