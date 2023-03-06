import clsx from "clsx";
import NextLink, { LinkProps } from "next/link";

import buttonStyles from "../button/Button.module.scss";

import styles from "./Typography.module.scss";
import { AnchorProps, TypographyProps } from "./Typography.types";

export const Typography: React.FC<TypographyProps> & {
  Headline1: React.FC<TypographyProps>;
  Headline2: React.FC<TypographyProps>;
  Headline3: React.FC<TypographyProps>;
  Headline4: React.FC<TypographyProps>;
  Headline5: React.FC<TypographyProps>;
  Headline6: React.FC<TypographyProps>;
  Text: React.FC<TypographyProps>;
  TextLead: React.FC<TypographyProps>;
  TextBold: React.FC<TypographyProps>;
  Subtitle: React.FC<TypographyProps>;
  ButtonLabel: React.FC<TypographyProps>;
  MiniButtonLabel: React.FC<TypographyProps>;
  Description: React.FC<TypographyProps>;
  MiniDescription: React.FC<TypographyProps>;
  Link: React.FC<AnchorProps & LinkProps>;
  Anchor: React.FC<AnchorProps>;
} = ({ children, className }) => <div className={clsx(styles.typography, className)}>{children}</div>;

const Headline1: React.FC<TypographyProps> = ({ children, className, inline, flat, ...props }) => (
  <h1
    className={clsx(styles.typography__headline1, className, {
      [styles.typography__inline]: inline,
      [styles.typography__flat]: flat,
    })}
    {...props}
  >
    {children}
  </h1>
);

const Headline2: React.FC<TypographyProps> = ({ children, className, flat, inline, display, ...props }) => (
  <h2
    className={clsx(styles.typography__headline2, className, {
      [styles.typography__inline]: inline,
      [styles.typography__flat]: flat,
      [styles.typography__display]: display,
    })}
    {...props}
  >
    {children}
  </h2>
);

const Headline3: React.FC<TypographyProps> = ({ children, className, flat, ...props }) => (
  <h3 className={clsx(styles.typography__headline3, className, { [styles.typography__flat]: flat })} {...props}>
    {children}
  </h3>
);

const Headline4: React.FC<TypographyProps> = ({ children, className, inline, flat, ...props }) => (
  <h4
    className={clsx(styles.typography__headline4, className, {
      [styles.typography__inline]: inline,
      [styles.typography__flat]: flat,
    })}
    {...props}
  >
    {children}
  </h4>
);

const Headline5: React.FC<TypographyProps> = ({ children, className, ...props }) => (
  <h5 className={clsx(styles.typography__headline5, className)} {...props}>
    {children}
  </h5>
);

const Headline6: React.FC<TypographyProps> = ({ children, className, ...props }) => (
  <h6 className={clsx(styles.typography__headline6, className)} {...props}>
    {children}
  </h6>
);

const Text: React.FC<TypographyProps> = ({
  children,
  className,
  inline,
  flat,
  truncate,
  inherit,
  display,
  ...props
}) => (
  <p
    className={clsx(styles.typography__text, className, {
      [styles.typography__inline]: inline,
      [styles.typography__display]: display,
      [styles.typography__inherit]: inherit,
      [styles.typography__flat]: flat,
      [styles.typography__truncate]: truncate,
    })}
    {...props}
  >
    {children}
  </p>
);

const TextLead: React.FC<TypographyProps> = ({ children, className, flat, inline, ...props }) => (
  <p
    className={clsx(styles["typography__text-lead"], className, {
      [styles.typography__inline]: inline,
      [styles.typography__flat]: flat,
    })}
    {...props}
  >
    {children}
  </p>
);

const TextBold: React.FC<TypographyProps> = ({ children, className, flat }) => (
  <p className={clsx(styles["typography__text-bold"], className, { [styles.typography__flat]: flat })}>{children}</p>
);

const Subtitle: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx(styles.typography__subtitle, className)}>{children}</p>
);

const ButtonLabel: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={clsx(styles["typography__button-label"], className)}>{children}</span>
);

const MiniButtonLabel: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={clsx(styles["typography__mini-button-label"], className)}>{children}</span>
);

const Description: React.FC<TypographyProps> = ({ children, className, inline, flat, truncate, ...props }) => (
  <p
    className={clsx(styles.typography__description, className, {
      [styles.typography__inline]: inline,
      [styles.typography__truncate]: truncate,
      [styles.typography__flat]: flat,
    })}
    {...props}
  >
    {children}
  </p>
);

const MiniDescription: React.FC<TypographyProps> = ({ children, className, flat, align, ...props }) => (
  <p
    className={clsx(styles["typography__mini-description"], className, {
      [styles.typography__flat]: flat,
      [styles["typography__align--center"]]: align === "center",
      [styles["typography__align--right"]]: align === "right",
    })}
    {...props}
  >
    {children}
  </p>
);

const Link: React.FC<AnchorProps & LinkProps> = ({
  children,
  className,
  href,
  truncate,
  flat,
  as,
  size,
  variant,
  ...props
}) => (
  <NextLink href={href} {...props}>
    <a
      className={clsx(className, {
        [styles.typography__link]: as === undefined,
        [styles.typography__truncate]: truncate,
        [styles.typography__flat]: flat,
        [styles["typography__link--button"]]: as === "button",
        [buttonStyles.button]: as === "button",
        [buttonStyles["button--primary"]]: as === "button" && variant === "contained",
        [buttonStyles["button--auto-size"]]: as === "button" && !size,
        [buttonStyles["button--extra-small"]]: as === "button" && size === "xs",
        [buttonStyles["button-outline"]]: as === "button" && variant === "outlined",
        [buttonStyles["button--text"]]: as === "button" && variant === "text",
      })}
      {...props}
    >
      {children}
    </a>
  </NextLink>
);

const Anchor: React.FC<AnchorProps> = ({ children, className, truncate, flat, as, size, variant, ...props }) => (
  <a
    className={clsx(className, {
      [styles.typography__link]: as === undefined,
      [styles.typography__truncate]: truncate,
      [styles.typography__flat]: flat,
      [styles["typography__link--button"]]: as === "button",
      [buttonStyles.button]: as === "button",
      [buttonStyles["button--primary"]]: as === "button" && variant === "contained",
      [buttonStyles["button--auto-size"]]: as === "button" && !size,
      [buttonStyles["button--extra-small"]]: as === "button" && size === "xs",
      [buttonStyles["button-outline"]]: as === "button" && variant === "outlined",
      [buttonStyles["button--text"]]: as === "button" && variant === "text",
    })}
    {...props}
  >
    {children}
  </a>
);

Typography.Headline1 = Headline1;
Typography.Headline2 = Headline2;
Typography.Headline3 = Headline3;
Typography.Headline4 = Headline4;
Typography.Headline5 = Headline5;
Typography.Headline6 = Headline6;
Typography.Text = Text;
Typography.TextLead = TextLead;
Typography.TextBold = TextBold;
Typography.Subtitle = Subtitle;
Typography.ButtonLabel = ButtonLabel;
Typography.MiniButtonLabel = MiniButtonLabel;
Typography.Description = Description;
Typography.MiniDescription = MiniDescription;
Typography.Link = Link;
Typography.Anchor = Anchor;
