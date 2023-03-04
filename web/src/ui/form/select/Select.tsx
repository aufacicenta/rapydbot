import { cloneElement, Children, ReactElement, useRef, MouseEvent, ReactNode } from "react";
import clsx from "clsx";
import { useField } from "react-final-form";

import { Dropdown } from "ui/dropdown/Dropdown";
import { Icon } from "ui/icon/Icon";
import { Button } from "ui/button/Button";

import { SelectProps } from "./Select.types";
import { Item } from "./item/Item";
import { SelectContext } from "./selectContext/SelectContext";
import styles from "./Select.module.scss";

export function Select({
  children,
  className,
  disabled,
  hasError,
  hintMessage,
  id,
  inputProps,
  isNotOutlined,
  listboxClassName,
  onClear,
  placeholder,
  prefix,
  selectButtonClassName,
  size,
  style,
  "aria-describedby": ariaDescribedby = "",
  ...props
}: SelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const childrenArray = Children.toArray(children as ReactNode[]);
  const hintMessageId = hintMessage ? `${id}--desc` : "";

  const handleChange = (value: number | string) => {
    inputProps.onChange(value);
  };

  const selectedValue = childrenArray
    .filter((child) => (child as ReactElement).props.value === inputProps.value)
    .map((child) => (child as ReactElement).props.children)[0];

  useField(id, props);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        "select",
        "input-field",
        styles.select,
        {
          [styles["select--disabled"]]: disabled,
          [styles["select--not-outlined"]]: isNotOutlined,
        },
        className,
      )}
      style={style}
    >
      <SelectContext.Provider
        value={{
          value: inputProps.value,
          onChange: handleChange,
        }}
      >
        <Dropdown
          id={id}
          aria-describedby={`${ariaDescribedby} ${hintMessageId}`}
          listboxClassName={clsx(listboxClassName)}
          disabled={disabled}
          listboxStyle={{
            width: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().width : undefined,
          }}
          size={size === "s" ? "m" : size}
          className={clsx(
            "select__field",
            styles.select__field,
            {
              [styles["select__field--disabled"]]: disabled,
              [styles["select__field--error"]]: hasError,
              [styles["select__field--big"]]: size === "l",
              [styles["select__field--small"]]: size === "s",
              [styles["not-outlined"]]: isNotOutlined,
            },
            selectButtonClassName,
          )}
          trigger={
            <>
              {selectedValue ? (
                <span className={styles.select__value}>
                  {prefix && <strong>{prefix}</strong>}
                  {selectedValue}
                </span>
              ) : (
                <span className={styles.select__placeholder}>{placeholder}</span>
              )}
              {onClear && (
                <Button
                  variant="text"
                  color="secondary"
                  size="xs"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  data-testid="clear-select"
                >
                  <Icon name="icon-cross" />
                </Button>
              )}
              <Icon name="icon-chevron-down" className={styles["select__field--icon"]} />
            </>
          }
          onSelectFocusedItem={(focusedIndex) => {
            inputProps.onChange((childrenArray[focusedIndex] as ReactElement).props.value);
          }}
        >
          {childrenArray.map((child, index) =>
            cloneElement(child as ReactElement, {
              index,
            }),
          )}
        </Dropdown>
      </SelectContext.Provider>
    </div>
  );
}

Select.Item = Item;
