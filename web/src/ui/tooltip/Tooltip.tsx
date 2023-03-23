import clsx from "clsx";
import { useState } from "react";

import { Icon } from "ui/icon/Icon";
import { Typography } from "ui/typography/Typography";
import { Card } from "ui/card/Card";

import { TooltipProps, TooltipWrapperProps } from "./Tooltip.types";
import styles from "./Tooltip.module.scss";

export const Tooltip = ({ className, title, description }: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleOnClick = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div className={clsx(styles.tooltip, className)}>
      <div
        className={clsx(styles.tooltip__backdrop, {
          [styles["tooltip__backdrop--visible"]]: isTooltipVisible,
        })}
        onClick={handleOnClick}
        role="presentation"
      />
      <Icon name="icon-question-circle" onClick={handleOnClick} className={styles.tooltip__icon} />
      <Card
        shadow
        className={clsx(styles.tooltip__box, {
          [styles["tooltip__box--visible"]]: isTooltipVisible,
        })}
      >
        <div>
          {!!title && (
            <Typography.Description className={styles.tooltip__title}>
              <strong>{title}</strong>
            </Typography.Description>
          )}
          <Typography.Description dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </Card>
    </div>
  );
};

const Wrapper = ({ children }: TooltipWrapperProps) => <div className={styles.tooltip__wrapper}>{children}</div>;

Tooltip.Wrapper = Wrapper;
