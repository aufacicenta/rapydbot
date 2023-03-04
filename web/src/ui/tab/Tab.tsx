import clsx from "clsx";
import React from "react";

import { TabContextController } from "../../context/tab/TabContextController";

import { Item } from "./item/Item";
import { ItemProps } from "./item/Item.types";
import { Navigation } from "./navigation/Navigation";
import { NavigationProps } from "./navigation/Navigation.types";
import { Pane } from "./pane/Pane";
import { PaneProps } from "./pane/Pane.types";
import styles from "./Tab.module.scss";
import { TabProps } from "./Tab.types";

export const Tab: React.FC<TabProps> & {
  Navigation: React.FC<NavigationProps>;
  Item: React.FC<ItemProps>;
  Pane: React.FC<PaneProps>;
} = ({ children, className, defaultPaneId }) => (
  <TabContextController defaultPaneId={defaultPaneId}>
    <div className={clsx(styles.tab, className)}>{children}</div>
  </TabContextController>
);

Tab.Navigation = Navigation;
Tab.Item = Item;
Tab.Pane = Pane;
