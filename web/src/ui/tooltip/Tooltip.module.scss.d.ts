export type Styles = {
  tooltip: string;
  tooltip__backdrop: string;
  "tooltip__backdrop--visible": string;
  tooltip__box: string;
  "tooltip__box--visible": string;
  tooltip__icon: string;
  tooltip__title: string;
  tooltip__wrapper: string;
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
