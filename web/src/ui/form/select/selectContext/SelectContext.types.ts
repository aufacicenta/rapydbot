export type SelectContextType = {
  value: string | number | boolean | undefined;
  onChange(value: string | number | boolean): void;
};
