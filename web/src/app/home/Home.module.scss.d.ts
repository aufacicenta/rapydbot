export type Styles = {
  home: string;
  home__banner: string;
  "home__border-column": string;
  "home__border-column--title": string;
  "home__faqs--box": string;
  home__intro: string;
  "home__login-box": string;
  home__section: string;
  "home__use-cases--card": string;
  "home__use-cases--card-box": string;
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
