import { cloneElement, Children, useState, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { CSSTransition } from "react-transition-group";

import { useUniqueId } from "hooks/useUniqueId/useUniqueId";
import { useOnClickOutside } from "hooks/useOnClickOutside/useOnClickOutside";
import { useFocusableList } from "hooks/useFocusableList/useFocusableList";
import { MenuList } from "ui/menuList/MenuList";

import { DropdownProps } from "./Dropdown.types";
import { Item } from "./item/Item";
import styles from "./Dropdown.module.scss";
import { DropdownContext } from "./dropdownContext/DropdownContext";

export function Dropdown({
  trigger,
  children,
  id: idFromProps,
  size,
  listboxClassName,
  listboxStyle,
  disabled,
  onSelectFocusedItem,
  placement = "bottom-start",
  isOpenedByDefault = false,
  ...props
}: DropdownProps) {
  const id = useUniqueId({ prefix: "dropdown-", idFromProps });
  const [isListboxOpened, setListboxOpened] = useState(isOpenedByDefault);
  const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null);
  const [listboxRef, setListboxRef] = useState<HTMLUListElement | null>(null);
  const childrenArray = Children.toArray(children as ReactNode[]);

  const [focusedOption, handleInputKeyDown, setFocusedOption] = useFocusableList(
    { current: listboxRef },
    {
      isListOpened: isListboxOpened,
      options: childrenArray.map((child) => (child as ReactElement).props.children),
      optionsLength: childrenArray.length,
      onSelect: (index: number) => {
        if (onSelectFocusedItem) {
          onSelectFocusedItem(index);
        }
        setListboxOpened(false);
      },
      onClose: () => setListboxOpened(false),
      onOpen: () => setListboxOpened(true),
    },
  );

  const { styles: popperStyles } = usePopper(buttonRef, listboxRef, {
    placement,
    modifiers: [
      {
        name: "offset" as const,
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  useOnClickOutside(
    { current: buttonRef },
    () => {
      if (isListboxOpened || focusedOption) {
        setListboxOpened(false);
        setFocusedOption(null);
      }
    },
    "listbox",
  );

  return (
    <>
      <div
        id={id}
        ref={setButtonRef}
        onKeyDown={handleInputKeyDown}
        aria-haspopup="true"
        aria-expanded={isListboxOpened}
        aria-owns={isListboxOpened ? `${id}-options` : undefined}
        aria-controls={isListboxOpened ? `${id}-options` : undefined}
        role="button"
        tabIndex={0}
        onClick={() => !disabled && setListboxOpened((isOpened) => !isOpened)}
        {...props}
      >
        {trigger}
      </div>
      {typeof window !== "undefined" &&
        createPortal(
          <CSSTransition
            in={isListboxOpened}
            timeout={300}
            classNames={{
              enter: styles["dropdown__listbox--enter"],
              enterActive: styles["dropdown__listbox--enter-active"],
              exit: styles["dropdown__listbox--exit"],
              exitActive: styles["dropdown__listbox--exit-active"],
            }}
            unmountOnExit
          >
            <MenuList
              ref={setListboxRef}
              id={`${id}-options`}
              aria-expanded
              tabIndex={0}
              style={{
                ...popperStyles.popper,
                ...listboxStyle,
                maxWidth: buttonRef ? buttonRef.getBoundingClientRect().width : undefined,
              }}
              className={clsx("listbox", listboxClassName, styles.dropdown__listbox)}
              onClick={() => setListboxOpened(false)}
              size={size}
            >
              <DropdownContext.Provider
                value={{
                  focusedIndex: focusedOption,
                }}
              >
                {childrenArray.map((child, index) =>
                  cloneElement(child as ReactElement, {
                    index,
                  }),
                )}
              </DropdownContext.Provider>
            </MenuList>
          </CSSTransition>,
          document.querySelector("#modal-root")!,
        )}
    </>
  );
}

Dropdown.Item = Item;
