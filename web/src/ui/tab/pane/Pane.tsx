import clsx from "clsx";
import { useEffect, useState } from "react";

import { useTabContext } from "../../../hooks/useTabContext/useTabContext";

import styles from "./Pane.module.scss";
import { PaneProps } from "./Pane.types";

export const Pane: React.FC<PaneProps> = ({ children, className, id }) => {
  const { activePane } = useTabContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(activePane === id);
  }, [activePane, id]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={clsx(styles.pane, className, {
        [styles.pane__active]: isActive,
      })}
    >
      {children}
    </div>
  );
};
