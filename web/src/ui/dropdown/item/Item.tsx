import { useDropdownContext } from "../dropdownContext/useDropdownContext";
import { MenuList } from "ui/menuList/MenuList";

import { ItemProps } from "./Item.types";

export const Item = ({ children, className, index, icon, role, onClick, onKeyDown }: ItemProps) => {
  const dropdownContext = useDropdownContext();

  return (
    <MenuList.Item
      data-option-index={index}
      data-focus={dropdownContext.focusedIndex === index}
      role={role || "menuitem"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={className}
    >
      {icon}
      {children}
    </MenuList.Item>
  );
};
