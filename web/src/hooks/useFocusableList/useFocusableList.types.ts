export type UseFocusableListOptions = {
  isListOpened: boolean;
  optionsLength: number;
  onSelect: (option: number) => void;
  options?: string[];
  onClose(): void;
  onOpen(): void;
};
