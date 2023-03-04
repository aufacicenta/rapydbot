import clsx from "clsx";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { Button } from "ui/button/Button";
import { Grid } from "ui/grid/Grid";
import { Icon } from "ui/icon/Icon";
import { IconButton } from "../iconButton/IconButton";
import { CloseIcon } from "../icons/CloseIcon";

import { CloseButton } from "./CloseButton/CloseButton";
import styles from "./Modal.module.scss";
import {
  ModalFullscreenProps,
  ModalHeaderProps,
  ModalItemProps,
  ModalNotFullscreenProps,
  ModalProps,
} from "./Modal.types";

export const MODAL_ANIMATION_TIME = 300;

export const Modal = ({
  children,
  className,
  style,
  onClose,
  afterClose,
  isOpened,
  isPortalDisabled,
  withDetachedClose,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ModalProps) => {
  const { size = "m", withCloseIcon } = props as ModalNotFullscreenProps;
  const { fullscreenVariant } = props as ModalFullscreenProps;

  // Save page scrollY before modal is opened and restore it after close
  // It fixes auto scroll to input fields on focus in android
  const [pageScrollY, setPageScrollY] = useState(0);

  useEffect(() => {
    if (isOpened && fullscreenVariant === "default") {
      setTimeout(() => {
        setPageScrollY(window.scrollY);
        window.scrollTo(0, 0);
      }, MODAL_ANIMATION_TIME);
    }
  }, [isOpened, fullscreenVariant]);

  useEffect(() => {
    if (!isOpened && pageScrollY) {
      window.scrollTo(0, pageScrollY);
    }
  }, [isOpened, pageScrollY]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    event.stopPropagation();

    onClose();
  };

  const modalElement = (
    <CSSTransition
      in={isOpened}
      timeout={MODAL_ANIMATION_TIME}
      classNames={{
        enter: styles["modal--enter"],
        enterActive: styles["modal--enter-active"],
        exit: styles["modal--exit"],
        exitActive: styles["modal--exit-active"],
      }}
      unmountOnExit
      onExited={() => {
        if (!isOpened && afterClose) {
          afterClose();
        }
      }}
    >
      <div role="presentation" className={styles.modal} onKeyDown={handleKeyDown} tabIndex={-1}>
        <div aria-hidden className={styles.modal__overlay} onClick={onClose} />
        {withDetachedClose && (
          <IconButton
            data-testid="close-modal"
            className={clsx(styles["modal__close-button--float"])}
            size="xs"
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            <CloseIcon variant="small" />
          </IconButton>
        )}
        <div
          role="dialog"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-modal="true"
          className={clsx(styles.modal__wrapper, className, {
            [styles["modal__wrapper--fullscreen"]]: fullscreenVariant === "default",
            [styles["modal__wrapper--fullscreen-on-mobile"]]: fullscreenVariant === "mobile-only",
            [styles["modal__wrapper--small"]]: size === "s",
            [styles["modal__wrapper--medium"]]: size === "m",
            [styles["modal__wrapper--large"]]: size === "l",
            [styles["modal__wrapper--pullup"]]: withDetachedClose,
          })}
          style={style}
        >
          {withCloseIcon && <CloseButton className={styles["modal__close-button"]} onClick={onClose} />}
          {children}
        </div>
      </div>
    </CSSTransition>
  );

  return createPortal(modalElement, document.querySelector("#modal-root")!);
};

Modal.Header = ({ children, className, onClose, ...props }: ModalHeaderProps) => {
  if (onClose) {
    return (
      <div className={clsx(styles.modal__header, className)} {...props}>
        <Grid.Row justify="between" align="center">
          <Grid.Col lg={8} xs={8}>
            {children}
          </Grid.Col>
          <Grid.Col lg={4} xs={4}>
            <div className={styles["modal__header--on-close"]}>
              <Button
                size="xs"
                onClick={onClose}
                color="secondary"
                variant="text"
                className={styles["modal__header--on-close-icon"]}
              >
                <Icon name="icon-cross" />
              </Button>
            </div>
          </Grid.Col>
        </Grid.Row>
      </div>
    );
  }

  return (
    <div className={clsx(styles.modal__header, className)} {...props}>
      {children}
    </div>
  );
};

Modal.Content = ({ className, ...props }: ModalItemProps) => (
  <div className={clsx(styles.modal__content, className)} {...props} />
);

Modal.Actions = ({ className, ...props }: ModalItemProps) => (
  <div className={clsx(styles.modal__actions, className)} {...props} />
);

Modal.CloseButton = CloseButton;
