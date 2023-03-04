export type Styles = {
  toast: string;
  "toast__close-button": string;
  toast__content: string;
  toast__icon: string;
  toast__title: string;
  "toast--confirmation": string;
  "toast--error": string;
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
