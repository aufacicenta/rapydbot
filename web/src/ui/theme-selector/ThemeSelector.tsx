import clsx from "clsx";
import { useEffect, useState } from "react";

import { Icon } from "ui/icon/Icon";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

import styles from "./ThemeSelector.module.scss";
import { ThemeSelectorProps, Theme } from "./ThemeSelector.types";

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
  const localStorage = useLocalStorage();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const localTheme = localStorage.get<Theme>("theme");

    if (!localTheme) {
      localStorage.set("theme", theme);
      document.body.dataset.theme = theme;

      return;
    }

    document.body.dataset.theme = localTheme;
    setTheme(localTheme);
  }, [localStorage, theme]);

  const handleOnThemeChange = (newTheme: Theme) => {
    localStorage.set("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={clsx(className, styles["theme-selector"])}>
      <div className={styles["theme-selector__wrapper"]}>
        <div
          className={clsx(styles["theme-selector__moon"], {
            [styles["theme-selector__moon--active"]]: theme === "dark",
          })}
          onClick={() => handleOnThemeChange("dark")}
          onKeyDown={() => handleOnThemeChange("dark")}
          role="button"
          tabIndex={0}
        >
          <Icon name="icon-moon-2" />
        </div>
        <div className={styles["theme-selector__divider"]} />
        <div
          className={clsx(styles["theme-selector__sun"], {
            [styles["theme-selector__sun--active"]]: theme === "light",
          })}
          onClick={() => handleOnThemeChange("light")}
          onKeyDown={() => handleOnThemeChange("light")}
          role="button"
          tabIndex={0}
        >
          <Icon name="icon-sun" />
        </div>
      </div>
    </div>
  );
};
