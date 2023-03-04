export type Styles = {
  notifications: string;
  notifications__badge: string;
  notifications__content: string;
  "notifications__content--empty": string;
  notifications__header: string;
  "notifications__header--actions": string;
  "notifications__header--title": string;
  notifications__list: string;
  notifications__trigger: string;
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
