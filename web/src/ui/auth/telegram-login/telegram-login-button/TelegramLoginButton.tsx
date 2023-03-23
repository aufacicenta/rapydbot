import clsx from "clsx";

import { Button } from "ui/button/Button";

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
    Summon @tgibot
  </Button>
);
