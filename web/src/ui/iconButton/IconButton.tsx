import clsx from "clsx";

import { Button } from "../button/Button";

import { IconButtonProps } from "./IconButton.types";
import styles from "./IconButton.module.scss";

export const IconButton = ({ className, style, size = "m", ...buttonProps }: IconButtonProps) => (
  <Button
    className={clsx(styles["icon-button"], className, {
      [styles["icon-button--super-extra-small"]]: size === "xxs",
      [styles["icon-button--extra-small"]]: size === "xs",
      [styles["icon-button--small"]]: size === "s",
      [styles["icon-button--medium"]]: size === "m",
      [styles["icon-button--large"]]: size === "l",
      [styles["icon-button--loading"]]: buttonProps.isLoading,
    })}
    style={style}
    {...buttonProps}
  />
);
