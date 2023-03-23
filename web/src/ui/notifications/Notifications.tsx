import clsx from "clsx";

import { Icon } from "ui/icon/Icon";
import { Dropdown } from "ui/dropdown/Dropdown";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";

import styles from "./Notifications.module.scss";
import { NotificationsProps } from "./Notifications.types";

export const Notifications: React.FC<NotificationsProps> = ({ className }) => {
  // Dummy variables
  const dummyNotifications = [];
  const dummyNotificationsAmount = 0;
  const hasNotifications = true;

  const getNotifications = () =>
    dummyNotifications?.length ? (
      <></>
    ) : (
      <div className={styles["notifications__content--empty"]}>
        <Icon name="icon-bell" />
        <Typography.Description>No new notifications</Typography.Description>
      </div>
    );

  return (
    <div className={clsx(styles.notifications, className)}>
      {hasNotifications && <div className={styles.notifications__badge} />}
      <Dropdown
        placement="bottom-end"
        listboxClassName={styles.notifications__list}
        size="l"
        trigger={<Icon name="icon-bell" className={styles.notifications__trigger} />}
      >
        <div className={styles.notifications__header}>
          <div className={styles["notifications__header--title"]}>
            <div>
              <Typography.Headline2>{dummyNotificationsAmount}</Typography.Headline2>
            </div>
            <div>
              <Typography.Description>pending notifications</Typography.Description>
            </div>
          </div>
          <div className={styles["notifications__header--actions"]}>
            <Button color="primary" size="xs">
              Clear All
            </Button>
          </div>
        </div>
        <div className={styles.notifications__content}>{getNotifications()}</div>
      </Dropdown>
    </div>
  );
};
