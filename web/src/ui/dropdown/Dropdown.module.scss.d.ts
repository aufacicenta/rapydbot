export type Styles = {
  dropdown__listbox: string;
  "dropdown__listbox--enter": string;
  "dropdown__listbox--enter-active": string;
  "dropdown__listbox--exit": string;
  "dropdown__listbox--exit-active": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
