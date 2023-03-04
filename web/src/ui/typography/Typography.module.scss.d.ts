export type Styles = {
  typography: string;
  "typography__align--center": string;
  "typography__align--right": string;
  "typography__button-label": string;
  typography__description: string;
  typography__flat: string;
  typography__headline1: string;
  typography__headline2: string;
  typography__headline3: string;
  typography__headline4: string;
  typography__headline5: string;
  typography__headline6: string;
  typography__inline: string;
  typography__link: string;
  "typography__link--button": string;
  "typography__mini-button-label": string;
  "typography__mini-description": string;
  typography__subtitle: string;
  typography__text: string;
  "typography__text-bold": string;
  "typography__text-lead": string;
  typography__truncate: string;
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
