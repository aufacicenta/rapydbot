import clsx from "clsx";

import { Button } from "ui/button/Button";
import { Icon } from "ui/icon/Icon";

import { TelegramLoginButtonProps } from "./TelegramLoginButton.types";
import styles from "./TelegramLoginButton.module.scss";

export const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({ className }) => (
  <Button
    variant="outlined"
    size="l"
    fullWidth
    className={clsx(styles["telegram-login-button"], className)}
    as="a"
    href="https://t.me/rapydbot"
    target="_blank"
  >
    Log In with Telegram <Icon name="icon-paper-plane" />
  </Button>
);
