import { useState, useEffect, useCallback, RefObject, KeyboardEvent } from "react";

import { useDebounce } from "hooks/useDebounce/useDebounce";

import { UseFocusableListOptions } from "./useFocusableList.types";

const SPECIAL_CHARS = ["Alt", "Meta", "Control", "Shift", "CapsLock", "ArrowLeft", "ArrowRight", "Backspace"];
const CLEAR_DEBOUNCE_TIME = 500;

export const useFocusableList = (
  listboxRef: RefObject<HTMLUListElement>,
  { isListOpened, optionsLength, onSelect, onClose, onOpen, options }: UseFocusableListOptions,
) => {
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);
  const [virtualInputValue, setVirtualInputValue] = useState<null | string>(null);
  const [clearValue] = useDebounce(() => {
    setVirtualInputValue(null);
  }, CLEAR_DEBOUNCE_TIME);

  useEffect(() => {
    if (focusedIndex !== null) {
      const listboxNode = listboxRef.current!;

      if (listboxNode && listboxNode.scrollHeight > listboxNode.clientHeight) {
        const element = listboxNode.querySelector(`[data-option-index="${focusedIndex}"]`)! as HTMLElement;

        const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
        const elementBottom = element.offsetTop + element.offsetHeight;

        if (elementBottom > scrollBottom) {
          listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
        } else if (element.offsetTop < listboxNode.scrollTop) {
          listboxNode.scrollTop = element.offsetTop;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedIndex]);

  useEffect(() => {
    if (virtualInputValue) {
      clearValue();
    }
  }, [virtualInputValue, clearValue]);

  useEffect(() => {
    if (virtualInputValue) {
      const itemIndex = options?.findIndex((v) => v.toLowerCase?.().startsWith(virtualInputValue.toLowerCase()));

      if (itemIndex !== undefined && itemIndex !== -1) {
        setFocusedIndex(itemIndex);
      }
    }
  }, [virtualInputValue, options, setFocusedIndex]);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (isListOpened && e.key === "ArrowDown") {
        e.preventDefault();

        if (focusedIndex !== null && focusedIndex >= optionsLength - 1) {
          setFocusedIndex(0);
        } else {
          setFocusedIndex((active) => (active !== null ? active + 1 : 0));
        }

        return;
      }

      if (isListOpened && e.key === "ArrowUp") {
        e.preventDefault();

        if (focusedIndex !== null && focusedIndex === 0) {
          setFocusedIndex(optionsLength - 1);
        } else {
          setFocusedIndex((active) => (active !== null ? active - 1 : 0));
        }

        return;
      }

      if (e.key === "Enter" && focusedIndex !== null) {
        onSelect(focusedIndex);

        setFocusedIndex(null);
        e.preventDefault();

        return;
      }

      if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        onOpen();

        return;
      }

      if (["Escape", "Tab"].includes(e.key)) {
        setFocusedIndex(null);
        onClose();

        return;
      }

      if (options && e.key && !SPECIAL_CHARS.includes(e.key)) {
        if (!isListOpened) {
          onOpen();
        }

        setVirtualInputValue((v) => (v || "") + e.key);
      }
    },
    [focusedIndex, isListOpened, onOpen, onClose, onSelect, options, optionsLength],
  );

  return [focusedIndex, handleInputKeyDown, setFocusedIndex] as const;
};
