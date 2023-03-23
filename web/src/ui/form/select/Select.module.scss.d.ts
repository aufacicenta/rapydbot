export type Styles = {
  "not-outlined": string;
  select: string;
  select__field: string;
  "select__field--big": string;
  "select__field--disabled": string;
  "select__field--error": string;
  "select__field--icon": string;
  "select__field--small": string;
  select__placeholder: string;
  select__value: string;
  "select--disabled": string;
  "select--not-outlined": string;
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
