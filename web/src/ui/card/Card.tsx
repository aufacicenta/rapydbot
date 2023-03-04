import clsx from "clsx";
import React from "react";

import styles from "./Card.module.scss";
import { CardActionsProps, CardContentProps, CardProps } from "./Card.types";

export const Card: React.FC<CardProps> & {
  Content: React.FC<CardContentProps>;
  Actions: React.FC<CardActionsProps>;
} = ({ children, className, backgroundImageUrl, url, shadow, ...props }) => (
  <div
    className={clsx(styles.card, className, {
      [styles.card__link]: !!url || !!props.onClick,
      [styles.card__shadow]: !!shadow,
    })}
    {...props}
  >
    {backgroundImageUrl && (
      <div
        className={clsx(
          {
            [styles["card__background-image"]]: !!backgroundImageUrl,
          },
          "card__background-image",
        )}
        style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined }}
      />
    )}
    {children}
  </div>
);

const Content: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={clsx(styles.card__content, className)}>{children}</div>
);

const Actions: React.FC<CardActionsProps> = ({ children, className }) => (
  <div className={clsx(styles.card__actions, className)}>{children}</div>
);

Card.Content = Content;
Card.Actions = Actions;
