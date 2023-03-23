export type Styles = {
  "icon-button": string;
  "icon-button--extra-small": string;
  "icon-button--large": string;
  "icon-button--loading": string;
  "icon-button--medium": string;
  "icon-button--small": string;
  "icon-button--super-extra-small": string;
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
