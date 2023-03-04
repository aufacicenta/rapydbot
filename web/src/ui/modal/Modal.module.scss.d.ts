export type Styles = {
  modal: string;
  modal__actions: string;
  "modal__close-button": string;
  "modal__close-button--float": string;
  modal__content: string;
  modal__header: string;
  "modal__header--on-close": string;
  "modal__header--on-close-icon": string;
  modal__overlay: string;
  modal__wrapper: string;
  "modal__wrapper--fullscreen": string;
  "modal__wrapper--fullscreen-on-mobile": string;
  "modal__wrapper--large": string;
  "modal__wrapper--medium": string;
  "modal__wrapper--pullup": string;
  "modal__wrapper--small": string;
  "modal--enter": string;
  "modal--enter-active": string;
  "modal--exit": string;
  "modal--exit-active": string;
  "z-depth-0": string;
  "z-depth-1": string;
  "z-depth-1-half": string;
  "z-depth-2": string;
  "z-depth-3": string;
  "z-depth-4": string;
  "z-depth-5": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
