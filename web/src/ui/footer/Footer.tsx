import clsx from "clsx";

import styles from "./Footer.module.scss";
import { FooterProps } from "./Footer.types";

export const Footer: React.FC<FooterProps> = ({ className }) => <footer className={clsx(styles.footer, className)} />;
