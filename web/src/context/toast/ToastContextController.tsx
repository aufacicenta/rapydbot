import React, { useState, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";

import { Toast as ToastComponent } from "ui/toast/Toast";

import { ToastContextProviderProps, ToastOptions } from "./ToastContext.types";
import { ToastContext } from "./ToastContext";
import styles from "./ToastContext.module.scss";

const createId = () => Math.random().toString(36).slice(2, 11);
const DEFAULT_TIMEOUT = 5000;

export const ToastContextController = ({ children }: ToastContextProviderProps) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const removeToast = (toastToRemoveId: string) =>
    setToasts((oldToasts) => oldToasts.filter(({ id }) => id !== toastToRemoveId));

  const trigger = useCallback((newToast: ToastOptions) => {
    const id = createId();
    setToasts((currentToasts) => [...currentToasts, { ...newToast, id }]);

    if (newToast.withTimeout !== false) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.timeout || DEFAULT_TIMEOUT);
    }
  }, []);

  const toastWrapper = ({
    toastItems,
    position,
  }: {
    toastItems: ToastOptions[];
    position: ToastOptions["position"];
  }) => (
    <>
      {toastItems.length === 0 ? null : (
        <div
          className={clsx(styles["toast-wrapper"], position === "top" && styles["toast-wrapper--top"])}
          data-testid="toasts-wrapper"
        >
          <TransitionGroup>
            {toastItems.map((toast) => (
              <CSSTransition
                timeout={300}
                classNames={{
                  enter: styles["toast--enter"],
                  enterActive: styles["toast--enter-active"],
                  exit: styles["toast--exit"],
                  exitActive: styles["toast--exit-active"],
                }}
                key={toast.id}
              >
                <ToastComponent
                  {...toast}
                  onClose={() => (toast.onActionClick ? toast.onActionClick() : removeToast(toast.id!))}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}
    </>
  );

  return (
    <ToastContext.Provider value={{ trigger }}>
      {children}
      {toastWrapper({ toastItems: toasts.filter((toast) => toast.position === "top"), position: "top" })}
      {toastWrapper({
        toastItems: toasts.filter((toast) => toast.position === undefined || toast.position === "bottom"),
        position: "bottom",
      })}
    </ToastContext.Provider>
  );
};
