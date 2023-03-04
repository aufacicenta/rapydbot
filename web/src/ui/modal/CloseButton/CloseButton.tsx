import clsx from "clsx";

import { IconButton } from "../../iconButton/IconButton";
import { CloseIcon } from "../../icons/CloseIcon";

import styles from "./CloseButton.module.scss";
import { CloseButtonProps } from "./CloseButton.types";

export const CloseButton = ({ className, style, variant, color, onClick }: CloseButtonProps) => (
  <IconButton
    type="button"
    variant={variant || "text"}
    color={color || "secondary"}
    className={clsx(styles["close-button"], className)}
    style={style}
    aria-label="close"
    onClick={onClick}
    data-testid="modal-close-button"
  >
    <CloseIcon />
  </IconButton>
);
