import { DetailedHTMLProps, HTMLAttributes, CSSProperties, ReactNode } from "react";

type ModalCommonProps = {
  isOpened: boolean;
  children: ReactNode;
  "aria-labelledby": string;
  "aria-describedby"?: string;
  size?: "s" | "m" | "l";
  className?: string;
  style?: CSSProperties;
  isPortalDisabled?: boolean;
  withDetachedClose?: boolean;
  afterClose?(): void;
  onClose(): void;
};

// Fullscreen modal cannot have close icon with position fixed because it is not accessible then
export type ModalFullscreenProps = ModalCommonProps & {
  fullscreenVariant: "default" | "mobile-only";
};

export type ModalNotFullscreenProps = ModalCommonProps & {
  withCloseIcon?: boolean;
};

export type ModalProps = ModalFullscreenProps | ModalNotFullscreenProps;

export type ModalItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type ModalHeaderProps = ModalItemProps & {
  onClose?: () => void;
};
