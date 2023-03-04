import clsx from "clsx";

import { useTabContext } from "../../../hooks/useTabContext/useTabContext";

import styles from "./Item.module.scss";
import { ItemProps } from "./Item.types";

export const Item: React.FC<ItemProps> = ({ children, className, paneId }) => {
  const { setActivePane, activePane } = useTabContext();

  return (
    <div
      className={clsx(styles.item, className, {
        [styles.item__active]: activePane === paneId,
      })}
      onClick={() => setActivePane(paneId)}
      onKeyDown={() => setActivePane(paneId)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
