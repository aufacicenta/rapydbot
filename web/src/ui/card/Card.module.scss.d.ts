export type Styles = {
  card: string;
  card__actions: string;
  "card__background-image": string;
  card__content: string;
  card__link: string;
  card__shadow: string;
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
