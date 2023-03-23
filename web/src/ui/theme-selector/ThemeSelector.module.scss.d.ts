export type Styles = {
  "theme-selector": string;
  "theme-selector__divider": string;
  "theme-selector__moon": string;
  "theme-selector__moon--active": string;
  "theme-selector__sun": string;
  "theme-selector__sun--active": string;
  "theme-selector__wrapper": string;
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
