import clsx from "clsx";

import { HorizontalLineProps } from "./HorizontalLine.types";
import styles from "./HorizontalLine.module.scss";

export const HorizontalLine: React.FC<HorizontalLineProps> = ({ className, flat }) => (
  <hr className={clsx(styles["horizontal-line"], className, { [styles["horizontal-line__flat"]]: flat })} />
);
